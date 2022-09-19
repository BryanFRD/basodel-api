const DB = require('../database/db');
const Mailer = require('../mails/Mailer.mail');
const BaseService = require('./BaseService.service');

class UserCredential extends BaseService {
  
  create = async (model, req, res) => {
    const transaction = await DB.transaction();
    
    const result = await model.create(
      {...req.body.model},
      {
        transaction: transaction,
        include: [...Object.values(model.associations)]
      })
        .then(async model => {
          await transaction.commit();
          const {id, email} = model.toJSON();
          
          const emailToken = generateEmailToken({id});
          
          Mailer.sendConfirmationEmail(`${process.env.APP_URL}/confirmation/${emailToken}`, email);
          
          return {statusCode: 201, content: {message: 'message.emailSent'}};
        })
        .catch(async error => {
          await transaction.rollback();
          return {statusCode: 400, content: {error}};
        });
    
    return res.status(result.statusCode).send(result.content);
  }
  
}

module.exports = UserCredential;