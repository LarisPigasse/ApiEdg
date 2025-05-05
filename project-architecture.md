# Architettura Progetto React + Node.js

## Informazioni Generali

- **Nome progetto**: EDG - EdgPro
- **Data ultimo aggiornamento**: 2025-05-05
- **Sessione corrente**: 4
- **Repository**:
  - Frontend: [ProEdg](https://github.com/LarisPigasse/ProEdg.git)
  - Backend: [ApiEdg](https://github.com/LarisPigasse/ApiEdg.git)

## Struttura del Progetto

### Frontend (ProEdg)

```
src/
├── assets/                             # Immagini, font, ecc.
├── components/                         # Componenti React riutilizzabili
│   ├── layout/                         # Componenti di layout (Header, Footer, ecc.)
│   │   ├── AppLogo.tsx                 # Logo dell'applicazione
│   │   ├── ConnectionStatus.tsx        # Indicatore connessione backend
│   │   ├── Footer.tsx                  # Footer dell'applicazione
│   │   ├── Header.tsx                  # Header dell'applicazione
│   │   └── VersionInfo.tsx             # Componente info versione
│   ├── navigation/                     # Componenti di navigazione
│   |   ├── MainMenu.tsx                # Menu principale (specifico per modulo)
│   |   ├── ModuleDropdownItem.tsx      # Elemento dropdown del menu moduli
│   |   ├── ModuleMenuItem.tsx          # Elemento nel menu dei moduli
│   |   ├── ModulesMenu.tsx             # Menu dei moduli nella header
|   |   ├── FooterMenu.tsx              # Menu nel footer
│   |   └── UserProfileMenu.tsx         # Menu utente con dropdown
|   └── ui/
│       ├── Button.tsx                  # Componente button con variati
│       ├── Input.tsx                   # Componente input con varianti
│       ├── SubmitButton.tsx            # Componente button per submit
├── config/                             # Configurazioni statiche
│   ├── constants.ts                    # Costanti globali dell'applicazione
│   ├── menuItems.ts                    # Definizione degli elementi del menu
│   └── modulesConfig.ts                # Configurazione dei moduli
├── context/                            # Context API e provider
├── features/                           # Funzionalità organizzate (per Redux)
├── hooks/                              # Custom hooks React
├── layouts/                            # Layout condivisi dell'applicazione
│   └── MainLayout.tsx                  # Layout principale con header, menu, content e footer
├── pages/                              # Pagine dell'applicazione
│   ├── auth/                           # Pagine base dell'applicazione
│   |   ├── login.tsx                   # Pagina del login
│   |   └── ResetPasswordConfirm.tsx    # Pagina di conferma del reset della password
│   |   └── ResetPasswordRequest.tsx    # Pagina di richiesta del reset della password
│   └── base/                           # Pagine base dell'applicazione
│       ├── Dashboard.tsx               # Dashboard principale
│       └── NotFound.tsx                # Pagina 404
├── routes/                             # Configurazione delle route
│   └── index.tsx                       # Definizione delle route dell'applicazione
├── services/                           # Servizi e chiamate API
|   └── apiService.ts                   # Tipi e funzioni per le risposte API
|   └── authService.ts                  # Servizio di autenticazione
├── store/                              # Configurazione Redux
│   ├── hooks.ts                        # Hook tipizzati per Redux
│   ├── index.ts                        # Configurazione dello store
│   ├── rootReducer.ts                  # Combinazione dei reducer
│   └── slices/                         # Slice Redux per funzionalità
│       └── authSlice.ts                # Slice per autenticazione
├── types/                              # Definizioni TypeScript
└── utils/                              # Funzioni di utilità
```

### Backend (ApiEdg)

```
src/
├── config/                         # Configurazioni
├── controllers/                    # Controller per le route
├── middleware/                     # Middleware Express
├── models/                         # Modelli dati/database
├── routes/                         # Definizioni delle route API
├── services/
│   ├── emailService.ts             # Servizio invio email automatiche
│   └── email-templates/            # Template per le email atuomatiche
│       ├── passwordReset.ts        # Template per il reset della password e per la conferma
│       ├── ... (altri template)    # Altri template ancora da definire
│       └── baseTemplate.ts         # Templare di base per elementi comuni a tutte le email automatiche
├── types/                          # Definizioni TypeScript
└── utils/                          # Funzioni di utilità
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
| Struttura Redux         | 🟢 Completato   | Store configurato con slice per auth           |
| Struttura componenti    | 🟢 Completato   | Architettura modulare con componenti atomici   |
| Menu moduli             | 🟢 Completato   | Menu con supporto dropdown e permessi          |
| User profile            | 🟢 Completato   | Menu utente con dropdown implementato          |
| Indicatore connessione  | 🟢 Completato   | Verifica e mostra stato connessione al backend |
| Autenticazione          | 🟢 Completato   | Slice redux e UI implementati, reset password  |
| Pagine CRUD operatori   | 🔴 Non iniziato | Da implementare                                |

## Stato Sviluppo Backend

| API/Servizio                      | Stato         | Endpoint            | Note                                 |
| --------------------------------- | ------------- | ------------------- | ------------------------------------ |
| Configurazione backend            | 🟢 Completato | -                   | -                                    |
| Def. modelli dati con Sequelize   | 🟢 Completato | -                   | Modello Operatori creato             |
| Implementazione delle route API   | 🟢 Completato | -                   | Route per Operatori create           |
| Configurazione autenticazione JWT | 🟢 Completato | -                   | -                                    |
| Autenticazione                    | 🟢 Completato | `/api/auth`         | Login, token verify, change password |
| Operatori                         | 🟢 Completato | `/api/operatori`    | CRUD completo con autorizzazioni     |
| Endpoint health check             | 🟢 Completato | `/api/utils/health` | Per verifica connessione             |

## Decisioni Architetturali

- **Frontend**: SPA (Single Page Application) con React e TypeScript
- **Backend**: API RESTful con Express e TypeScript
- **Database**: MySQL per la persistenza dei dati
- **ORM**: Sequelize per interazione con database
- **Gestione stato**: Redux per stato globale, React Query per dati remoti
- **Styling**: TailwindCSS utility-first approach con estensioni custom
- **Icone**: Lucide Icons per un design minimalista e professionale
- **Formulari**: Formik con validazione Yup
- **Build tool**: Vite per HMR veloce e build ottimizzate
- **Tabelle**: TanStack Table per gestione tabelle complesse
- **Autenticazione**: JWT implementato nel backend, in corso nel frontend
- **Layout**: Layout responsive ottimizzato con priorità al content
- **Componenti**: Architettura modulare con componenti piccoli e focalizzati
- **Configurazione**: Costanti globali centralizzate per facile manutenzione

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

### Sessione 3 (2025-04-28)

- Ottimizzazione layout per dare priorità al content
- Implementazione struttura modulare dei componenti
- Creazione menu moduli con dropdown e gestione permessi
- Implementazione profile dropdown con info utente
- Configurazione Redux con slice per autenticazione
- Aggiunta indicatore stato connessione al backend
- Implementazione file costanti globali
- Estensione TailwindCSS con classi personalizzate (text-xxs)
- Aggiornamento documentazione dell'architettura

### Sessione 4 (2025-05-05)

- Pagine per autenticazione e reset passwors
- Prevista gestione UUID per le entità principali, per ora solo operatori
- Frontend, sempre seguendo filosofia dei piccoli componenti, abbiamo definito Button, SubmitButton e Input
- Aggiornamento documentazione dell'architettura

## TODO Prossima Sessione

- Implementare l'autenticazione nel frontend integrandola con le API del backend
- Creare la pagina di login
- Implementare gestione token JWT e persistenza sessione
- Implementare route protette
- Creare endpoint health check nel backend
- Creare la pagina di gestione degli operatori con tabella e form
- Implementare React Query per chiamate API

## Note Importanti

- Prioritizzare la modularità e la riusabilità dei componenti
- Mantenere una chiara separazione delle responsabilità tra frontend e backend
- Documentare i tipi TypeScript in modo completo
- Assicurare che l'interfaccia utente sia responsive e funzioni su diversi dispositivi
- Evitare stringhe hardcoded utilizzando le costanti globali
