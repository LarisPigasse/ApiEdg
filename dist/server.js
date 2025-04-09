"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
// Configurazione variabili d'ambiente
dotenv_1.default.config();
// Importa la connessione al database
require("./config/database");
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Permetti richieste senza origin (come Postman)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            console.log(`Origine non consentita: ${origin}`);
            callback(new Error("Non consentito da CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes di base
app.get("/", (req, res) => {
    res.send("Backend Edg versione 1.0.0");
});
// Gestione errori di route non trovate
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint non trovato" });
});
// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT} in modalità ${process.env.NODE_ENV}`);
});
exports.default = app;
