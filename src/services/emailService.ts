import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  passwordResetTemplate,
  passwordResetConfirmationTemplate,
} from "./email-templates/passwordReset";

// Carica le variabili d'ambiente
dotenv.config();

// Configurazione transporter per nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "user@example.com",
    pass: process.env.EMAIL_PASSWORD || "password",
  },
});

/// Interfaccia per le opzioni di base dell'email
interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

// Funzione generica per inviare email
const sendEmail = async (options: EmailOptions): Promise<void> => {
  const mailOptions = {
    from: `"${process.env.APP_NAME || "EdgProject"}" <${
      process.env.EMAIL_FROM || "noreply@example.com"
    }>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    // Verifica se siamo in ambiente di sviluppo
    if (
      process.env.NODE_ENV === "development" &&
      process.env.EMAIL_SEND === "false"
    ) {
      // In sviluppo, stampa il contenuto nella console invece di inviare l'email
      console.log("=============== EMAIL CONTENT ===============");
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log("HTML Content:");
      console.log(options.html);
      console.log("=============================================");
      return;
    }

    // Invia l'email
    await transporter.sendMail(mailOptions);
    console.log(`Email inviata a ${options.to}`);
  } catch (error) {
    console.error("Errore nell'invio dell'email:", error);
    throw new Error("Errore nell'invio dell'email");
  }
};

/**
 * Invia un'email per il reset della password
 * @param to Indirizzo email del destinatario
 * @param name Nome del destinatario
 * @param resetLink Link per il reset della password
 */
export const sendPasswordResetEmail = async (
  to: string,
  name: string,
  resetLink: string
): Promise<void> => {
  const appName = process.env.APP_NAME || "EdgProject";

  const emailContent = passwordResetTemplate({
    name,
    resetLink,
    appName,
  });

  await sendEmail({
    to,
    subject: emailContent.subject,
    text: emailContent.text,
    html: emailContent.html,
  });
};

/**
 * Invia un'email di conferma dopo il reset della password
 * @param to Indirizzo email del destinatario
 * @param name Nome del destinatario
 */
export const sendPasswordResetConfirmationEmail = async (
  to: string,
  name: string
): Promise<void> => {
  const appName = process.env.APP_NAME || "EdgProject";

  const emailContent = passwordResetConfirmationTemplate({
    name,
    appName,
  });

  await sendEmail({
    to,
    subject: emailContent.subject,
    text: emailContent.text,
    html: emailContent.html,
  });
};

// Esporta la funzione generica per uso futuro
export { sendEmail };
