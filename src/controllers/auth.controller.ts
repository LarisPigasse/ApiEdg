import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Operatori } from "../models/operatori";
import { generateToken } from "../middleware/auth.middleware";

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
      password: undefined, // Utilizziamo undefined invece di delete
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
    const operatore = await Operatori.findByPk(req.user?.idOperatore, {
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
