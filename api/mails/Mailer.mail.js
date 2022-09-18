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
      text: `Cliquez sur le lien afin de valider la création de votre compte. ${confirmationURL}`,
      html: `Cliquez sur le lien afin de valider la création de votre compte.<br />
      <a href=${confirmationURL}>${confirmationURL}</a>`
    });
  }
  
}

module.exports = Mailer;