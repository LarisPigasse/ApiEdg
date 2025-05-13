# EDG-ProEdg

EDG-ProEdg è un'applicazione web per la gestione interna di Express Delivery, sviluppata con React (frontend) e Node.js con Express (backend).

## 📋 Panoramica

EDG-ProEdg è un sistema di gestione aziendale che permette di:

- Gestire operatori e utenti del sistema
- Amministrare profili e permessi
- Offrire un'interfaccia moderna e reattiva
- Garantire la sicurezza delle operazioni attraverso autenticazione JWT

### Backend

- Node.js con Express.js
- TypeScript per la type safety
- MySQL come database relazionale
- Sequelize come ORM
- JWT per l'autenticazione

## 🔧 Prerequisiti

- Node.js 18+
- npm o yarn
- MySQL 8.x

## ⚙️ Installazione

### Backend (ApiEdg)

```
src/
├── config/                 # Configurazioni
├── controllers/            # Controller per le route
├── middleware/             # Middleware Express
├── models/                 # Modelli dati/database
├── routes/                 # Definizioni delle route API
├── services/               # Servizi per logica business
├── types/                  # Definizioni TypeScript
└── utils/                  # Funzioni di utilità
```
