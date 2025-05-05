// Template base per tutte le email
export const baseTemplate = (
  content: string,
  appName: string = "EDG -EdgPro",
  edgName: string = "Express Delivery"
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${appName}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0;
          padding: 0; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
          background-color: #ffffff;
        }
        .header { 
          background-color: #0ea5e9; 
          color: white; 
          padding: 10px 20px; 
          text-align: center; 
          margin-bottom: 20px;
          border-radius: 4px 4px 0 0;
        }
        .content { 
          padding: 20px; 
          background-color: #f9f9f9; 
          border: 1px solid #ddd;
          border-radius: 0 0 4px 4px;
        }
        .button { 
          display: inline-block; 
          background-color: #0ea5e9; 
          color: white !important; 
          padding: 10px 20px; 
          text-decoration: none; 
          border-radius: 4px; 
          margin: 10px 0;
          text-align: center;
        }
        .button:hover {
          color: #343430 !important;
        } 
        .footer { 
          margin-top: 30px; 
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px; 
          color: #777; 
          text-align: center;
        }
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
            padding: 10px !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">${appName}</h2>
        </div>
        ${content}
        <div class="footer">
          <p>Questo è un messaggio automatico, si prega di non rispondere.</p>
          <p>&copy; ${new Date().getFullYear()} ${edgName}. Tutti i diritti riservati.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Funzione per generare il testo semplice da HTML
export const stripHtml = (html: string): string => {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\n\s*\n/g, "\n")
    .trim();
};
