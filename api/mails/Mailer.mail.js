const nodemailer = require('nodemailer');

class Mailer {
  
  static transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  static sendConfirmationEmail = (confirmationURL, sendTo) => {
    this.transporter.sendMail({
      from: `"Basodel" <${process.env.EMAIL_USER}>`,
      to: sendTo,
      subject: 'Valider votre mail.',
      text: `Basodel\nCliquez sur le lien afin de valider la création de votre compte.\n${confirmationURL}`,
      html: `
      <div style="display:flex; align-items:center; flex-direction:column; gap:25px;">
        <h1>Basodel</h1>
        <span>Cliquez sur le lien afin de valider la création de votre compte.</span>
        <a href=${confirmationURL}>${process.env.APP_URL}/confirmation</a>
      </div>`
    });
  }
  
}

module.exports = Mailer;