import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Operatori } from "../models/operatori";
import { generateToken } from "../middleware/auth.middleware";
import { ResetTokens } from "../models/resetTokens";
import {
  sendPasswordResetEmail,
  sendPasswordResetConfirmationEmail,
} from "../services/emailService";

// Login operatore
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Valida input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e password sono richiesti" });
    }

    // Trova l'operatore tramite email
    const operatore = await Operatori.findOne({ where: { email } });
    if (!operatore) {
      return res.status(401).json({ message: "Credenziali non valide" });
    }

    // Verifica che l'operatore sia attivo
    if (operatore.stato !== "attivo") {
      return res.status(401).json({ message: "Account non attivo" });
    }

    // Verifica la password
    if (!operatore.password) {
      return res.status(401).json({ message: "Credenziali non valide" });
    }

    const isPasswordValid = await bcrypt.compare(password, operatore.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenziali non valide" });
    }

    // Aggiorna l'ultima login
    await operatore.update({ ultimaLogin: new Date() });

    // Genera token JWT
    const token = generateToken(operatore);

    // Prepara risposta con dati dell'operatore (esclusa la password)
    const operatoreData = {
      ...operatore.toJSON(),
      password: undefined,
    };

    res.status(200).json({
      message: "Login effettuato con successo",
      operatore: operatoreData,
      token,
    });
  } catch (error) {
    console.error("Errore in login:", error);
    res.status(500).json({ message: "Errore durante il login" });
  }
};

// Verifica token
export const verifyToken = async (req: Request, res: Response) => {
  try {
    // Il middleware authenticate ha già verificato il token e aggiunto req.user
    // Recuperiamo informazioni aggiornate dell'operatore
    const operatore = await Operatori.findByPk(req.user.idOperatore, {
      attributes: { exclude: ["password"] },
    });

    if (!operatore || operatore.stato !== "attivo") {
      return res.status(401).json({ message: "Operatore non autorizzato" });
    }

    res.status(200).json({
      message: "Token valido",
      operatore,
    });
  } catch (error) {
    console.error("Errore in verifyToken:", error);
    res.status(500).json({ message: "Errore durante la verifica del token" });
  }
};

// Cambio password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Valida input
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Password corrente e nuova password sono richieste" });
    }

    const operatore = await Operatori.findByPk(req.user.idOperatore);
    if (!operatore) {
      return res.status(404).json({ message: "Operatore non trovato" });
    }

    // Verifica la password corrente
    if (!operatore.password) {
      return res.status(400).json({ message: "Imposta prima una password" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      operatore.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password corrente non valida" });
    }

    // Hash e salva la nuova password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await operatore.update({
      password: hashedPassword,
      ultimaModifica: new Date(),
    });

    res.status(200).json({ message: "Password modificata con successo" });
  } catch (error) {
    console.error("Errore in changePassword:", error);
    res.status(500).json({ message: "Errore durante il cambio password" });
  }
};

// Ottieni informazioni sull'operatore corrente
export const getCurrentOperatore = async (req: Request, res: Response) => {
  try {
    const operatore = await Operatori.findByPk(req.user.idOperatore, {
      attributes: { exclude: ["password"] },
    });

    if (!operatore) {
      return res.status(404).json({ message: "Operatore non trovato" });
    }

    res.status(200).json(operatore);
  } catch (error) {
    console.error("Errore in getCurrentOperatore:", error);
    res
      .status(500)
      .json({ message: "Errore durante il recupero dei dati dell'operatore" });
  }
};

// Richiedi reset password
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email richiesta" });
    }

    // Cerca operatore con l'email specificata
    const operatore = await Operatori.findOne({ where: { email } });

    // Non rivelare se l'email esiste o meno (migliore sicurezza)
    if (!operatore || operatore.stato !== "attivo" || !operatore.email) {
      // Rispondiamo con successo anche se l'operatore non esiste per evitare enumerazione email
      return res.status(200).json({
        message:
          "Se l'indirizzo email è associato a un account, riceverai istruzioni per reimpostare la password.",
      });
    }

    // Genera token di reset
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token valido per 1 ora

    // Salva il token nel database
    await ResetTokens.create({
      token,
      idOperatore: operatore.idOperatore,
      expiresAt,
      used: false,
    });

    // Invia email con link di reset
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Verifica che email e operatore.operatore non siano null
    if (operatore.email && operatore.operatore) {
      await sendPasswordResetEmail(
        operatore.email,
        operatore.operatore,
        resetLink
      );
    } else {
      console.error(
        "Email o nome operatore mancante per l'invio della email di reset"
      );
      // Continuiamo comunque per non rivelare informazioni
    }

    res.status(200).json({
      message:
        "Se l'indirizzo email è associato a un account, riceverai istruzioni per reimpostare la password.",
    });
  } catch (error) {
    console.error("Errore in requestPasswordReset:", error);
    res
      .status(500)
      .json({ message: "Errore durante la richiesta di reset password" });
  }
};

// Valida token di reset
export const validateResetToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: "Token mancante" });
    }

    // Cerca il token nel database
    const resetToken = await ResetTokens.findOne({ where: { token } });

    // Verifica che il token esista e sia valido
    if (!resetToken || resetToken.used || new Date() > resetToken.expiresAt) {
      return res.status(400).json({ message: "Token non valido o scaduto" });
    }

    res.status(200).json({ message: "Token valido" });
  } catch (error) {
    console.error("Errore in validateResetToken:", error);
    res
      .status(500)
      .json({ message: "Errore durante la validazione del token" });
  }
};

// Reset password con token
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token e nuova password sono richiesti" });
    }

    // Cerca il token nel database
    const resetToken = await ResetTokens.findOne({ where: { token } });

    // Verifica che il token esista e sia valido
    if (!resetToken || resetToken.used || new Date() > resetToken.expiresAt) {
      return res.status(400).json({ message: "Token non valido o scaduto" });
    }

    // Trova l'operatore associato al token
    const operatore = await Operatori.findByPk(resetToken.idOperatore);

    if (!operatore || operatore.stato !== "attivo") {
      return res
        .status(404)
        .json({ message: "Operatore non trovato o non attivo" });
    }

    // Hash e salva la nuova password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await operatore.update({
      password: hashedPassword,
      ultimaModifica: new Date(),
    });

    // Segna il token come utilizzato
    await resetToken.update({ used: true });

    res.status(200).json({ message: "Password reimpostata con successo" });
  } catch (error) {
    console.error("Errore in resetPassword:", error);
    res.status(500).json({ message: "Errore durante il reset della password" });
  }
};
