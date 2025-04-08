# Architettura Progetto React + Node.js

## Informazioni Generali

- **Nome progetto**: EdgProject
- **Data ultimo aggiornamento**: 2025-04-08
- **Sessione corrente**: 1
- **Repository**:
  - Frontend: [ProEdg](https://github.com/LarisPigasse/ProEdg.git)
  - Backend: [ApiEdg](https://github.com/LarisPigasse/ApiEdg.git)

## Struttura del Progetto

### Frontend (ProEdg)

```
src/
├── assets/              # Immagini, font, ecc.
├── components/          # Componenti React riutilizzabili
├── context/             # Context API e provider
├── features/            # Funzionalità organizzate (per Redux)
├── hooks/               # Custom hooks React
├── layouts/             # Layout condivisi dell'applicazione
├── pages/               # Pagine dell'applicazione
├── services/            # Servizi e chiamate API
├── store/               # Configurazione Redux
├── types/               # Definizioni TypeScript
└── utils/               # Funzioni di utilità
```

### Backend (ApiEdg)

```
src/
├── config/              # Configurazioni
├── controllers/         # Controller per le route
├── middleware/          # Middleware Express
├── models/              # Modelli dati/database
├── routes/              # Definizioni delle route API
├── services/            # Logica di business
├── types/               # Definizioni TypeScript
└── utils/               # Funzioni di utilità
```

## Stack Tecnologico

### Frontend

| Tecnologia            | Versione | Scopo                           |
| --------------------- | -------- | ------------------------------- |
| Vite                  | Latest   | Build tool e dev server         |
| React                 | 18.x     | Libreria UI                     |
| TypeScript            | 5.x      | Type safety e manutenibilità    |
| React Router          | 6.x      | Navigazione                     |
| React Query           | 5.x      | Gestione chiamate API e caching |
| Redux Toolkit         | Latest   | Gestione stato globale          |
| TailwindCSS           | 3.x      | Styling                         |
| TanStack Table        | 8.x      | Tabelle complesse               |
| Formik                | 2.x      | Gestione form                   |
| Yup                   | Latest   | Validazione form                |
| Jest                  | Latest   | Testing                         |
| React Testing Library | Latest   | Testing componenti              |

### Backend

| Tecnologia | Versione | Scopo                        |
| ---------- | -------- | ---------------------------- |
| Node.js    | 18+      | Runtime JavaScript           |
| Express.js | 4.x      | Framework web                |
| TypeScript | 5.x      | Type safety e manutenibilità |
| MySQL      | 8.x      | Database relazionale         |
| Sequelize  | 6.x      | ORM per MySQL                |

## Stato Sviluppo Frontend

| Componente/Pagina       | Stato           | Note                          |
| ----------------------- | --------------- | ----------------------------- |
| Configurazione progetto | 🟡 In corso     | Definizione stack tecnologico |
| Setup iniziale con Vite | 🔴 Non iniziato | -                             |
| Routing                 | 🔴 Non iniziato | -                             |
| Struttura Redux         | 🔴 Non iniziato | -                             |
| Autenticazione          | 🔴 Non iniziato | -                             |
| Componenti UI base      | 🔴 Non iniziato | -                             |

## Stato Sviluppo Backend

| API/Servizio   | Stato           | Endpoint     | Note |
| -------------- | --------------- | ------------ | ---- |
| Setup iniziale | 🔴 Non iniziato | -            | -    |
| Autenticazione | 🔴 Non iniziato | `/api/auth`  | -    |
| Utenti         | 🔴 Non iniziato | `/api/users` | -    |

## Decisioni Architetturali

- **Frontend**: SPA (Single Page Application) con React e TypeScript
- **Backend**: API RESTful con Express e TypeScript
- **Database**: MySQL per la persistenza dei dati
- **ORM**: Sequelize per interazione con database
- **Gestione stato**: Redux per stato globale, React Query per dati remoti
- **Styling**: TailwindCSS utility-first approach
- **Formulari**: Formik con validazione Yup
- **Build tool**: Vite per HMR veloce e build ottimizzate
- **Tabelle**: TanStack Table per gestione tabelle complesse
- **Autenticazione**: JWT (da implementare)

## Progressi Sessioni

### Sessione 1 (2025-04-08)

- Discussione iniziale dell'architettura
- Creazione repository Git (frontend e backend)
- Definizione stack tecnologico frontend
- Creazione file di documentazione dell'architettura

## TODO Prossima Sessione

- Inizializzare progetto frontend con Vite e TypeScript
- Configurare TailwindCSS
- Impostare la struttura base del progetto frontend
- Configurare Redux e React Query
- Impostare il routing di base con React Router
- Inizializzare progetto backend con Express e TypeScript
- Configurare connessione MySQL e Sequelize

## Note Importanti

- Prioritizzare la modularità e la riusabilità dei componenti
- Mantenere una chiara separazione delle responsabilità tra frontend e backend
- Documentare i tipi TypeScript in modo completo
