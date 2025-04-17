# Linee Guida di Sviluppo

## Struttura delle Entità

Per ogni entità del database, seguiremo la seguente struttura:

1. **Definizione della tabella**: Creerò le tabelle in MySql e e con la struttura potrai definire il model `src/models`
2. **Controller CRUD**: Implementare le operazioni CRUD in un controller nella cartella `src/controllers`
3. **Routes API**: Definire le route API nella cartella `src/routes`

## Convenzioni di Nomenclatura

### Tabelle e Modelli

- I nomi delle tabelle saranno in italiano e inizieranno con la lettera maiuscola (es. `Operatori`, `Utenti`)
- I nomi dei file dei modelli saranno in minuscolo (es. `operatori.ts`, `utenti.ts`)
- I nomi delle classi dei modelli seguiranno il PascalCase (es. `Operatori`, `Utenti`)

### Campi

- I nomi dei campi saranno in italiano e in camelCase (es. `idOperatore`, `dataCreazione`, `ultimaLogin`)
- Gli ID primari avranno il prefisso "id" seguito dal nome dell'entità (es. `idOperatore`, `idUtente`)
- Le chiavi esterne avranno il prefisso "fk" seguito dal nome dell'entità riferita (es. `fkFornitore`, `fkCliente`)

### Variabili e Metodi

- Le variabili e i metodi seguiranno il camelCase (es. `getOperatore`, `updateUtente`)
- I nomi dei controller seguiranno il pattern `[entità].controller.ts` (es. `operatore.controller.ts`)
- I nomi delle route seguiranno il pattern `[entità].routes.ts` (es. `operatore.routes.ts`)

## Definizione delle Entità

Quando si introduce una nuova entità, verranno specificati:

- Nome della tabella
- Nomi e tipi dei campi
- Lunghezza dei campi VARCHAR
- Tipi per gli ENUM
- Eventuali vincoli o relazioni

Esempio:
Tabella Operatori

CREATE TABLE `Operatori` (
`idOperatore` int(11) NOT NULL,
`Operatore` varchar(64) NOT NULL DEFAULT '',
`email` varchar(64) DEFAULT NULL,
`password` varchar(256) DEFAULT NULL,
`stato` enum('attivo','inattivo','eliminato') NOT NULL DEFAULT 'attivo',
`note` text NOT NULL,
`ultimaLogin` datetime DEFAULT NULL,
`dataCreazione` datetime NOT NULL DEFAULT current_timestamp(),
`ultimaModifica` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

ALTER TABLE `Operatori`
ADD PRIMARY KEY (`idOperatore`),
ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `Operatori`
MODIFY `idOperatore` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

## Operazioni Standard per Entità

Per ogni entità implementeremo:

### Operazioni CRUD Base

1. **get[NomeEntità]**: Per ottenere un record specifico
2. **getAll[NomeEntità]**: Per ottenere tutti i record
3. **create[NomeEntità]**: Per creare un nuovo record
4. **update[NomeEntità]**: Aggiorna un record esistente
5. **delete[NomeEntità]**: Elimina un record esistente

### Operazioni Avanzate (per tabelle con molti record)

6. **filter[NomeEntità]**: Implementazione di una funzione di filtro/paginazione con i seguenti parametri:
   - `pageIndex`: Indice della pagina corrente (inizio a 0)
   - `pageSize`: Numero di record per pagina
   - `sort`: Oggetto che definisce il campo e la direzione di ordinamento (es. `{field: 'nome', direction: 'ASC'}`)
   - `query`: Parametri di ricerca/filtro (es. `{nome: 'Mario', tipo: 'privato'}`)

Esempio di risposta per filter:

```json
{
  "items": [...], // Record per la pagina corrente
  "totalItems": 100, // Numero totale di record che corrispondono ai filtri
  "totalPages": 10, // Numero totale di pagine
  "pageIndex": 0 // Indice della pagina corrente
}
```

## Architettura delle Operazioni

### Controller

Struttura standard di un controller:

```typescript
// src/controllers/[entità].controller.ts

// Ottieni tutti i record
export const getAll[Entità] = async (req: Request, res: Response) => {
  try {
    const items = await [Entità].findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il recupero dei dati' });
  }
};

// Ottieni un record specifico
export const get[Entità] = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await [Entità].findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Record non trovato' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il recupero del record' });
  }
};

// Filtra record con paginazione
export const filter[Entità] = async (req: Request, res: Response) => {
  try {
    const { pageIndex = 0, pageSize = 10, sort, query } = req.body;

    // Costruzione della query di filtro
    const where = {};
    if (query) {
      // Aggiungi filtri in base ai campi nel query
    }

    // Costruzione dell'ordinamento
    const order = [];
    if (sort && sort.field) {
      order.push([sort.field, sort.direction || 'ASC']);
    }

    // Esegui query con paginazione
    const { count, rows } = await [Entità].findAndCountAll({
      where,
      order,
      limit: pageSize,
      offset: pageIndex * pageSize
    });

    res.status(200).json({
      items: rows,
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      pageIndex: parseInt(pageIndex)
    });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il filtro dei record' });
  }
};

// Crea nuovo record
export const create[Entità] = async (req: Request, res: Response) => {
  try {
    const newItem = await [Entità].create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la creazione del record' });
  }
};

// Aggiorna record esistente
export const update[Entità] = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await [Entità].findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Record non trovato' });
    }

    await item.update(req.body);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\'aggiornamento del record' });
  }
};

// Elimina record
export const delete[Entità] = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await [Entità].findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Record non trovato' });
    }

    await item.destroy();
    res.status(200).json({ message: 'Record eliminato con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\'eliminazione del record' });
  }
};
```

### Routes

Struttura standard delle routes:

```typescript
// src/routes/[entità].routes.ts
import { Router } from "express";
import * as controller from "../controllers/[entità].controller";
import {
  authenticate,
  requireAccountType,
} from "../middleware/auth.middleware";

const router = Router();

// Tutte le route richiedono autenticazione
router.use(authenticate);

// Ottieni tutti i record
router.get("/", controller.getAll[Entità]);

// Filtra record con paginazione
router.post("/filter", controller.filter[Entità]);

// Ottieni un record specifico
router.get("/:id", controller.get[Entità]);

// Crea un nuovo record
router.post("/", controller.create[Entità]);

// Aggiorna un record esistente
router.put("/:id", controller.update[Entità]);

// Elimina un record
router.delete("/:id", controller.delete[Entità]);

export default router;
```

## Note di Sicurezza

### Password

- Le password vengono sempre hashate con bcrypt prima di essere salvate nel database

### Autenticazione e Autorizzazione

- Tutte le API (tranne login) richiedono autenticazione via JWT
- I token JWT hanno una scadenza definita in `.env` (default: 1 giorno)
- L'accesso alle risorse è controllato in base al tipo di account e al ruolo/livello dell'operatore

## Sviluppo del Frontend

Il frontend comunicherà con queste API utilizzando lo schema di risposta standardizzato. Per le tabelle che utilizzano paginazione, il frontend dovrebbe:

1. Inviare richieste POST all'endpoint `/filter` con i parametri di paginazione
2. Gestire la risposta che include items, totalItems, totalPages, pageIndex
3. Implementare l'interfaccia utente per la navigazione tra le pagine

## Convenzioni di Commit Git

- Feat: Nuova funzionalità
- Fix: Correzione di un bug
- Docs: Modifiche alla documentazione
- Style: Cambiamenti di formattazione, non funzionali
- Refactor: Refactoring del codice senza cambiamenti funzionali
- Test: Aggiunta o correzione di test
- Chore: Aggiornamenti di build, configurazioni, ecc.

Esempio: `Feat: Aggiunta entità Clienti con CRUD completo`
