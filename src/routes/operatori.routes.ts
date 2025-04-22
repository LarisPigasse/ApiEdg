import { Router } from "express";
import * as controller from "../controllers/operatori.controller";
import {
  authenticate,
  requireProfile,
  requireWriteAccess,
} from "../middleware/auth.middleware";

const router = Router();

// Middleware di autenticazione per tutte le rotte
const auth = authenticate as any;
router.use(auth);

// Rotte di lettura (accessibili a tutti)
router.get("/", controller.getAllOperatori as any);
router.get("/:id", controller.getOperatore as any);
router.post("/filter", controller.filterOperatori as any);

// Rotte di scrittura (non accessibili ai guest)
// operatori con profilo root e admin possono creare nuovi operatori
router.post(
  "/",
  requireWriteAccess as any,
  requireProfile(["root", "admin"]) as any,
  controller.createOperatore as any
);

// operatori con profilo root e admin possono modificare altri operatori
router.put(
  "/:id",
  requireWriteAccess as any,
  requireProfile(["root", "admin"]) as any,
  controller.updateOperatore as any
);

// solo operatori con profilo root possono eliminare operatori
router.delete(
  "/:id",
  requireWriteAccess as any,
  requireProfile(["root"]) as any,
  controller.deleteOperatore as any
);

export default router;
