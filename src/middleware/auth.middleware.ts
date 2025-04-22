import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Operatori } from "../models/operatori";

// Estendi l'interfaccia Request per includere l'utente
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware di autenticazione - verifica il token JWT
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Recupera il token dall'header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Autenticazione richiesta" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token non fornito" });
    }

    // Verifica il token
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
    // Utilizziamo as any per bypassare il controllo dei tipi
    const decoded: any = jwt.verify(token, JWT_SECRET as any);

    // Controlla che l'operatore esista e sia attivo
    const operatore = await Operatori.findByPk(decoded.idOperatore);
    if (!operatore || operatore.stato !== "attivo") {
      return res.status(401).json({ message: "Operatore non autorizzato" });
    }

    // Aggiunge l'utente alla richiesta
    req.user = {
      idOperatore: operatore.idOperatore,
      email: operatore.email,
      stato: operatore.stato,
      profilo: operatore.profilo,
      livello: operatore.livello,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token non valido" });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token scaduto" });
    }

    console.error("Errore di autenticazione:", error);
    res.status(500).json({ message: "Errore durante l'autenticazione" });
  }
};

// Middleware per verificare il tipo di account (se necessario in futuro)
export const requireAccountType = (accountType: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Autenticazione richiesta" });
    }

    // Qui andrà la logica per verificare il tipo di account
    // In base alle tue specifiche future

    next();
  };
};

// Middleware per verificare il profilo dell'operatore
export const requireProfile = (allowedProfiles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Autenticazione richiesta" });
    }
    if (!allowedProfiles.includes(req.user.profilo)) {
      return res.status(403).json({
        message: "Accesso negato: profilo non autorizzato",
      });
    }
    next();
  };
};

// Middleware per verificare il livello dell'operatore
export const requireLevel = (minLevel: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Autenticazione richiesta" });
    }

    // Se l'operatore è 'root', bypassare il controllo del livello
    if (req.user.profilo === "root") {
      return next();
    }

    if (req.user.livello < minLevel) {
      return res.status(403).json({
        message: `Accesso negato: livello richiesto ${minLevel}, livello corrente ${req.user.livello}`,
      });
    }

    next();
  };
};

// Middleware per verificare che l'operatore possa modificare dati (non è guest)
export const requireWriteAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Autenticazione richiesta" });
  }

  if (req.user.profilo === "guest") {
    return res.status(403).json({
      message:
        "Accesso negato: gli utenti con profilo guest possono solo leggere i dati",
    });
  }

  next();
};

// Funzione per generare un token JWT
export const generateToken = (operatore: any): string => {
  const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
  const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1d"; // Default: 1 giorno

  // Utilizziamo as any per bypassare il controllo dei tipi
  return jwt.sign(
    {
      idOperatore: operatore.idOperatore,
      email: operatore.email,
      profilo: operatore.profilo,
      livello: operatore.livello,
    },
    JWT_SECRET as any,
    { expiresIn: JWT_EXPIRATION } as any
  );
};
