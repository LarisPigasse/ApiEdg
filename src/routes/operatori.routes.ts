import { Router } from "express";
import * as controller from "../controllers/operatori.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Applica il middleware di autenticazione a tutte le route
// Questo è il modo corretto di usare il middleware con Express e TypeScript
router.use(authenticate as any);

// Ottieni tutti gli operatori
router.get("/", controller.getAllOperatori as any);

// Filtra operatori con paginazione
router.post("/filter", controller.filterOperatori as any);

// Ottieni un operatore specifico
router.get("/:id", controller.getOperatore as any);

// Crea un nuovo operatore
router.post("/", controller.createOperatore as any);

// Aggiorna un operatore esistente
router.put("/:id", controller.updateOperatore as any);

// Elimina un operatore (soft delete)
router.delete("/:id", controller.deleteOperatore as any);

export default router;
