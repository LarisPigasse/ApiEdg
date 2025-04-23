# Architettura Progetto React + Node.js

## Informazioni Generali

- **Nome progetto**: EdgProject
- **Data ultimo aggiornamento**: 2025-04-22
- **Sessione corrente**: 2
- **Repository**:
  - Frontend: [ProEdg](https://github.com/LarisPigasse/ProEdg.git)
  - Backend: [ApiEdg](https://github.com/LarisPigasse/ApiEdg.git)

## Struttura del Progetto

### Frontend (ProEdg)

```
src/
├── assets/                # Immagini, font, ecc.
├── components/            # Componenti React riutilizzabili
│   ├── layout/            # Componenti di layout (Header, Footer)
│   └── navigation/        # Componenti di navigazione (MainMenu)
├── config/                # Configurazioni statiche
│   └── menuItems.ts       # Definizione degli elementi del menu
├── context/               # Context API e provider
├── features/              # Funzionalità organizzate (per Redux)
├── hooks/                 # Custom hooks React
├── layouts/               # Layout condivisi dell'applicazione
│   └── MainLayout.tsx     # Layout principale con header, menu, content e footer
├── pages/                 # Pagine dell'applicazione
│   └── base/              # Pagine base dell'applicazione
│       ├── Dashboard.tsx  # Dashboard principale
│       └── NotFound.tsx   # Pagina 404
├── routes/                # Configurazione delle route
│   └── index.tsx          # Definizione delle route dell'applicazione
├── services/              # Servizi e chiamate API
├── store/                 # Configurazione Redux
├── types/                 # Definizioni TypeScript
├── routes/                # per tutti i file relativi al routing
├── config/                # per i dati statici del menu
└── utils/                 # Funzioni di utilità
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

| Componente/Pagina       | Stato           | Note                                           |
| ----------------------- | --------------- | ---------------------------------------------- |
| Configurazione progetto | 🟢 Completato   | Stack tecnologico definito e installato        |
| Setup iniziale con Vite | 🟢 Completato   | Progetto inizializzato con Vite e TypeScript   |
| Routing                 | 🟢 Completato   | Sistema di routing di base implementato        |
| Layout principale       | 🟢 Completato   | Layout con header, menu, content e footer      |
| Struttura Redux         | 🟡 In corso     | Configurato store, slice da implementare       |
| Autenticazione          | 🔴 Non iniziato | Da implementare integrazione con API           |
| Componenti UI base      | 🟡 In corso     | Creati componenti base di layout e navigazione |

## Stato Sviluppo Backend

| API/Servizio                      | Stato         | Endpoint         | Note                                 |
| --------------------------------- | ------------- | ---------------- | ------------------------------------ |
| Configurazione backend            | 🟢 Completato | -                | -                                    |
| Def. modelli dati con Sequelize   | 🟢 Completato | -                | Modello Operatori creato             |
| Implementazione delle route API   | 🟢 Completato | -                | Route per Operatori create           |
| Configurazione autenticazione JWT | 🟢 Completato | -                | -                                    |
| Autenticazione                    | 🟢 Completato | `/api/auth`      | Login, token verify, change password |
| Operatori                         | 🟢 Completato | `/api/operatori` | CRUD completo con autorizzazioni     |

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
- **Autenticazione**: JWT implementato nel backend, da integrare nel frontend
- **Layout**: Layout responsive minimalista con header, menu orizzontale, content e footer

## Progressi Sessioni

### Sessione 1 (2025-04-08)

- Discussione iniziale dell'architettura
- Creazione repository Git (frontend e backend)
- Definizione stack tecnologico frontend
- Creazione file di documentazione dell'architettura

### Sessione 2 (2025-04-22)

- Implementazione backend: modello Operatori, controller, routes, autenticazione
- Inizializzazione progetto frontend con Vite e TypeScript
- Configurazione TailwindCSS
- Creazione struttura base del progetto
- Implementazione sistema di routing
- Creazione layout principale responsive con header, menu, content e footer
- Aggiornamento documentazione dell'architettura

## TODO Prossima Sessione

- Implementare l'autenticazione nel frontend integrandola con le API del backend
- Creare la pagina di login e gestione del token JWT
- Implementare route protette
- Creare la pagina di gestione degli operatori con tabella e form
- Completare la configurazione di Redux e React Query

## Note Importanti

- Prioritizzare la modularità e la riusabilità dei componenti
- Mantenere una chiara separazione delle responsabilità tra frontend e backend
- Documentare i tipi TypeScript in modo completo
- Assicurare che l'interfaccia utente sia responsive e funzioni su diversi dispositivi
