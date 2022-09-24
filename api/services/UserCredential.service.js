const DB = require('../database/db');
const StringHelper = require('../helpers/StringHelper.helper');
const Mailer = require('../helpers/Mailer.mail');
const BaseService = require('./BaseService.service');

class UserCredentialService extends BaseService {
  
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
          
          Mailer.sendConfirmationEmail(emailToken.token, email);
          
          return {statusCode: 201, content: {message: 'message.emailSent'}};
        })
        .catch(async error => {
          await transaction.rollback();
          if(error?.name === 'SequelizeUniqueConstraintError')
            return {statusCode: 400, content: {error: `error.usercredential.create.${StringHelper.retrieveColumnFromSQLError(error.parent.sqlMessage)}`}}
          
          return {statusCode: 400, content: {error}};
        });
    
    return res.status(result.statusCode).send(result.content);
  }
  
}

module.exports = UserCredentialService;