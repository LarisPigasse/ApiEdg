import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// Configurazione variabili d'ambiente
dotenv.config();

// Importa la connessione al database
import "./config/database";

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

// Gestione errori di route non trovate
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint non trovato" });
});

// Avvio del server
app.listen(PORT, () => {
  console.log(
    `Server in esecuzione sulla porta ${PORT} in modalità ${process.env.NODE_ENV}`
  );
});

export default app;
