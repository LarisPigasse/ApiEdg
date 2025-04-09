"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Verifica che le variabili d'ambiente necessarie siano definite
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
    console.error("Variabili d'ambiente del database mancanti. Verificare il file .env");
    process.exit(1); // Termina l'applicazione con un codice di errore
}
// Creazione di un'istanza Sequelize che rappresenta la connessione al database
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD || "", {
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
});
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
exports.default = sequelize;
