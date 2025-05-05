import { baseTemplate, stripHtml } from "./baseTemplates";

interface PasswordResetTemplateData {
  name: string;
  resetLink: string;
  appName: string;
}

export const passwordResetTemplate = (data: PasswordResetTemplateData) => {
  const content = `
    <div class="content">
      <p>Gentile ${data.name},</p>
      <p>Abbiamo ricevuto una richiesta per reimpostare la password del tuo account.</p>
      <p>Clicca sul pulsante sottostante per impostare una nuova password:</p>
      <p style="text-align: center;">
        <a href="${data.resetLink}" class="button">Reimposta Password</a>
      </p>
      <p>O copia e incolla questo link nel tuo browser:</p>
      <p style="word-break: break-all; color: #666;">${data.resetLink}</p>
      <p><strong>Nota importante:</strong> Il link scadrà tra 1 ora.</p>
      <p>Se non hai richiesto il reset della password, puoi ignorare questa email e la tua password rimarrà invariata.</p>
    </div>
  `;

  const htmlContent = baseTemplate(content, data.appName);

  // Genera il testo semplice
  const textContent = `
    Reset Password - ${data.appName}
    
    Gentile ${data.name},
    
    Abbiamo ricevuto una richiesta per reimpostare la password del tuo account.
    
    Per reimpostare la password, visita il seguente link:
    ${data.resetLink}
    
    Il link scadrà tra 1 ora.
    
    Se non hai richiesto il reset della password, puoi ignorare questa email e la tua password rimarrà invariata.
    
    Questo è un messaggio automatico, si prega di non rispondere.
    
    © ${new Date().getFullYear()} ${data.appName}. Tutti i diritti riservati.
  `;

  return {
    html: htmlContent,
    text: textContent,
    subject: `Reset Password - ${data.appName}`,
  };
};

// Template per email di conferma reset password
export const passwordResetConfirmationTemplate = (data: {
  name: string;
  appName: string;
}) => {
  const content = `
    <div class="content">
      <p>Gentile ${data.name},</p>
      <p>La tua password è stata reimpostata con successo.</p>
      <p>Se non hai effettuato tu questa operazione, contatta immediatamente il nostro supporto.</p>
    </div>
  `;

  const htmlContent = baseTemplate(content, data.appName);

  const textContent = `
    Password Reimpostata - ${data.appName}
    
    Gentile ${data.name},
    
    La tua password è stata reimpostata con successo.
    
    Se non hai effettuato tu questa operazione, contatta immediatamente il nostro supporto.
    
    © ${new Date().getFullYear()} ${data.appName}. Tutti i diritti riservati.
  `;

  return {
    html: htmlContent,
    text: textContent,
    subject: `Password Reimpostata - ${data.appName}`,
  };
};
