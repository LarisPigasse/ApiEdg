import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { Operatori } from "../models/operatori";
import { ResetTokens } from "../models/resetTokens";

dotenv.config();

// Verifica che le variabili d'ambiente necessarie siano definite
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
  console.error(
    "Variabili d'ambiente del database mancanti. Verificare il file .env"
  );
  process.exit(1); // Termina l'applicazione con un codice di errore
}

// Creazione di un'istanza Sequelize che rappresenta la connessione al database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    dialect: "mysql",
    // Configurazione del logging delle query: in sviluppo: mostra le query in console, in produzione: disattiva i log
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    // Configurazione del pool di connessioni
    pool: {
      max: 5, // Numero massimo di connessioni nel pool
      min: 0, // Numero minimo di connessioni nel pool
      acquire: 30000, // Tempo massimo (ms) di attesa per ottenere una connessione
      idle: 10000, // Tempo massimo (ms) di inattività prima della disconnessione
    },
  }
);

// Inizializza i modelli
const initModels = () => {
  // Inizializza i modelli
  Operatori.initModel(sequelize);
  ResetTokens.initModel(sequelize);

  // Definisci le associazioni
  ResetTokens.belongsTo(Operatori, { foreignKey: "idOperatore" });
  Operatori.hasMany(ResetTokens, { foreignKey: "idOperatore" });

  return { Operatori, ResetTokens };
};

// Inizializza e esporta i modelli
const models = initModels();

// Verifica se la connessione al database funziona correttamente
sequelize
  .authenticate()
  .then(() => {
    console.log("Connessione al database stabilita con successo.");
  })
  .catch((err) => {
    console.error("Impossibile connettersi al database:", err);
    process.exit(1); // Termina l'applicazione in caso di errore di connessione
  });

export { sequelize, models };
