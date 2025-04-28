import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// Configurazione variabili d'ambiente
dotenv.config();

// Importa la connessione al database
import "./config/database";

// Importa modelli
import { Operatori } from "./models/operatori";

// Importa routes
import operatoriRoutes from "./routes/operatori.routes";
import authRoutes from "./routes/auth.routes";
import utilsRoutes from "./routes/utils.routes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Configurazione CORS
const allowedOrigins = [
  // Domini di produzione
  "https://pro.abruzzoresort.it",
  "https://app.abruzzoresort.it",
  // Domini per sviluppo locale
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:8080",
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Permetti richieste senza origin (come Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log(`Origine non consentita: ${origin}`);
        callback(new Error("Non consentito da CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes di base
app.get("/", (req: Request, res: Response) => {
  res.send("Backend Edg versione 1.0.0");
});

// Registra le routes API
app.use("/api/operatori", operatoriRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/utils", utilsRoutes);

// Gestione errori di route non trovate
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint non trovato" });
});

// Gestione errori globali
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Errore non gestito:", err);
  res.status(500).json({ message: "Errore del server" });
});

// Inizializzazione dei modelli e sincronizzazione con il database
// Questo codice deve essere eseguito dopo la configurazione del database in ./config/database
import { sequelize } from "./config/database";

// Inizializza modelli
Operatori.initModel(sequelize);

// Sincronizza i modelli con il database (solo in sviluppo e solo se richiesto)
if (process.env.NODE_ENV === "development" && process.env.DB_SYNC === "true") {
  sequelize
    .sync({ force: false, alter: false })
    .then(() => {
      console.log("Database sincronizzato (solo controllo, nessuna modifica)");
    })
    .catch((err) => {
      console.error("Errore nella sincronizzazione del database:", err);
    });
} else {
  console.log("Sincronizzazione del database disabilitata");
}

// Avvio del server
app.listen(PORT, () => {
  console.log(
    `Server in esecuzione sulla porta ${PORT} in modalità ${process.env.NODE_ENV}`
  );
});

export default app;
