import { Request, Response } from "express";
import { Operatori } from "../models/operatori";
import bcrypt from "bcrypt";
// Importa l'operatore Op da Sequelize per l'utilizzo nelle query di filtro
import { Op } from "sequelize";

// Ottieni tutti gli operatori
export const getAllOperatori = async (req: Request, res: Response) => {
  try {
    const operatori = await Operatori.findAll({
      attributes: { exclude: ["password"] }, // Non inviamo le password
    });
    res.status(200).json(operatori);
  } catch (error) {
    console.error("Errore in getAllOperatori:", error);
    res
      .status(500)
      .json({ message: "Errore durante il recupero degli operatori" });
  }
};

// Ottieni un operatore specifico
export const getOperatore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const operatore = await Operatori.findByPk(id, {
      attributes: { exclude: ["password"] }, // Non inviamo la password
    });

    if (!operatore) {
      return res.status(404).json({ message: "Operatore non trovato" });
    }

    res.status(200).json(operatore);
  } catch (error) {
    console.error("Errore in getOperatore:", error);
    res
      .status(500)
      .json({ message: "Errore durante il recupero dell'operatore" });
  }
};

// Filtra operatori con paginazione
export const filterOperatori = async (req: Request, res: Response) => {
  try {
    const { pageIndex = 0, pageSize = 10, sort, query } = req.body;

    // Costruzione della query di filtro
    const where: any = {};
    if (query) {
      if (query.Operatore) {
        where.Operatore = { [Op.like]: `%${query.Operatore}%` };
      }
      if (query.email) {
        where.email = { [Op.like]: `%${query.email}%` };
      }
      if (query.stato) {
        where.stato = query.stato;
      }
    }

    // Costruzione dell'ordinamento
    const order: any = [];
    if (sort && sort.field) {
      order.push([sort.field, sort.direction || "ASC"]);
    } else {
      // Ordinamento predefinito
      order.push(["idOperatore", "ASC"]);
    }

    // Esegui query con paginazione
    const { count, rows } = await Operatori.findAndCountAll({
      where,
      order,
      limit: Number(pageSize),
      offset: Number(pageIndex) * Number(pageSize),
      attributes: { exclude: ["password"] }, // Non inviamo le password
    });

    res.status(200).json({
      items: rows,
      totalItems: count,
      totalPages: Math.ceil(count / Number(pageSize)),
      pageIndex: Number(pageIndex),
    });
  } catch (error) {
    console.error("Errore in filterOperatori:", error);
    res
      .status(500)
      .json({ message: "Errore durante il filtro degli operatori" });
  }
};

// Crea nuovo operatore
export const createOperatore = async (req: Request, res: Response) => {
  try {
    const { Operatore, email, password, stato, note } = req.body;

    // Controlla se l'email è già utilizzata
    if (email) {
      const existingOperatore = await Operatori.findOne({ where: { email } });
      if (existingOperatore) {
        return res.status(400).json({ message: "Email già in uso" });
      }
    }

    // Hash della password se presente
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newOperatore = await Operatori.create({
      Operatore,
      email,
      password: hashedPassword,
      stato: stato || "attivo",
      note: note || "",
      ultimaLogin: null,
    });

    // Rimuovi la password dalla risposta
    const operatoreSenzaPassword = {
      ...newOperatore.toJSON(),
      password: undefined, // Utilizziamo undefined invece di delete
    };

    res.status(201).json(operatoreSenzaPassword);
  } catch (error) {
    console.error("Errore in createOperatore:", error);
    res
      .status(500)
      .json({ message: "Errore durante la creazione dell'operatore" });
  }
};

// Aggiorna operatore esistente
export const updateOperatore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Operatore, email, password, stato, note } = req.body;

    const operatore = await Operatori.findByPk(id);

    if (!operatore) {
      return res.status(404).json({ message: "Operatore non trovato" });
    }

    // Controlla se l'email è già utilizzata da un altro operatore
    if (email && email !== operatore.email) {
      const existingOperatore = await Operatori.findOne({ where: { email } });
      if (existingOperatore && existingOperatore.idOperatore !== Number(id)) {
        return res.status(400).json({ message: "Email già in uso" });
      }
    }

    // Prepara l'oggetto di aggiornamento
    const updateData: any = {};
    if (Operatore !== undefined) updateData.Operatore = Operatore;
    if (email !== undefined) updateData.email = email;
    if (stato !== undefined) updateData.stato = stato;
    if (note !== undefined) updateData.note = note;

    // Hash della password se presente
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await operatore.update(updateData);

    // Rimuovi la password dalla risposta
    const operatoreSenzaPassword = {
      ...operatore.toJSON(),
      password: undefined, // Utilizziamo undefined invece di delete
    };

    res.status(200).json(operatoreSenzaPassword);
  } catch (error) {
    console.error("Errore in updateOperatore:", error);
    res
      .status(500)
      .json({ message: "Errore durante l'aggiornamento dell'operatore" });
  }
};

// Elimina operatore
export const deleteOperatore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const operatore = await Operatori.findByPk(id);

    if (!operatore) {
      return res.status(404).json({ message: "Operatore non trovato" });
    }

    // Soft delete: impostiamo lo stato su 'eliminato' invece di eliminare fisicamente
    await operatore.update({ stato: "eliminato" });

    res.status(200).json({ message: "Operatore eliminato con successo" });
  } catch (error) {
    console.error("Errore in deleteOperatore:", error);
    res
      .status(500)
      .json({ message: "Errore durante l'eliminazione dell'operatore" });
  }
};
