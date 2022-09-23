const nodemailer = require('nodemailer');
const Logger = require('./Logger.helper');

class Mailer {
  
  static #transporter;
  
  static getTransporter = () => {
    if(!this.#transporter){
      try {
        this.#transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: process.env.EMAIL_PORT === '465',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
      } catch (error) {
        Logger.error(error);
      }
    }
    
    return this.#transporter;
  }
  
  static #sendMail = (options) => {
    if(!this.getTransporter()){
      Logger.error('Couldn\'t get transporter!');
      return;
    }
    
    this.getTransporter().sendMail(options);
  }
  
  static sendConfirmationEmail = (confirmationURL, sendTo) => {
    this.#sendMail({
      from: `"Basodel" <${process.env.EMAIL_USER}>`,
      to: sendTo,
      subject: 'Valider votre mail.',
      text: `Basodel\nCliquez sur le lien afin de valider la création de votre compte.\n${confirmationURL}`,
      html: `
      <div style="text-align: center; color: inherit;">
        <h1>Basodel</h1>
        <div style="text-align: center">
          <div>Cliquez sur le lien afin de valider la création de votre compte.</div>
          <a href=${confirmationURL}>${process.env.APP_URL}/confirmation</a>
        </div>
      </div>`
    });
  }
  
}

module.exports = Mailer;