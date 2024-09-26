// services/emailService.js
import { google } from 'googleapis';

// Create a Gmail client using the Google API
const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'http://localhost:5000/callback'
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

// Function to send email using Gmail API
export const sendEmail = async (to, subject, text, html) => {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  const email = `
    From: ${process.env.GMAIL_USER}
    To: ${to}
    Subject: ${subject}
    Content-Type: text/html; charset="UTF-8"
    
    ${html}
  `;
  
  const base64EncodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
  
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: base64EncodedEmail,
    },
  });
};
