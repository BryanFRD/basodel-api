const nodemailer = require('nodemailer');
const Logger = require('./Logger.helper');

class Mailer {
  
  static #transporter;
  
  static getTransporter = () => {
    if(!this.#transporter){
      try {
        Logger.error({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: process.env.EMAIL_PORT === '465',
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        });
        
        this.#transporter = nodemailer.createTransport({
          // host: process.env.EMAIL_HOST,
          // port: process.env.EMAIL_PORT,
          // secure: process.env.EMAIL_PORT === '465',
          // auth: {
          //   user: process.env.EMAIL_USER,
          //   pass: process.env.EMAIL_PASS
          // }
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
              user: 'modesto63@ethereal.email',
              pass: 'CT6K24JVwb3s8BRXeS'
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
      <div style="display:flex;align-items:center;flex-direction:column;gap:25px;">
        <h1>Basodel</h1>
        <span>Cliquez sur le lien afin de valider la création de votre compte.</span>
        <a href=${confirmationURL}>${process.env.APP_URL}/confirmation</a>
      </div>`
    });
  }
  
}

module.exports = Mailer;