import { Router } from "express";
import * as controller from "../controllers/auth.controller";
import {
  authenticate,
  requireWriteAccess,
} from "../middleware/auth.middleware";

const router = Router();

// Rotte pubbliche (non richiedono autenticazione)
router.post("/login", controller.login as any);

// Rotte protette (richiedono autenticazione)
// Utilizziamo "as any" in modo più esteso per risolvere i problemi di tipo
const auth = authenticate as any;
router.get("/verify", auth, controller.verifyToken as any);
router.post(
  "/change-password",
  auth,
  requireWriteAccess as any,
  controller.changePassword as any
);
router.get("/me", auth, controller.getCurrentOperatore as any);

export default router;
