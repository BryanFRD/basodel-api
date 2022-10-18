const Sequelize = require('sequelize');
const DB = require('../database/db');
const Mailer = require('../helpers/Mailer.mail');
const UserAccountModel = require('../models/UserAccount.model');
const UserCredentialModel = require('../models/UserCredential.model');
const BaseService = require('./BaseService.service');

class UserCredentialService extends BaseService {
  
  create = async (model, req, res) => {
    const reqModel = req.body.model;
    console.log('reqModel:', reqModel);
    
    const transaction = await DB.transaction();
    const result = await UserCredentialModel.create(
      reqModel,
      {
      include: [UserAccountModel],
      transaction: transaction
    })
      .then(uc => {
        transaction.rollback();
        
        const emailToken = generateEmailToken(req.body.model);
    
        Mailer.sendConfirmationEmail(emailToken.token, req.body.model.email);
        
        return {statusCode: 200, content: {
          message: 'message.emailSent',
          confirmation: `${process.env.APP_URL}/confirmation/${emailToken.token}`
        }}
      })
      .catch(error => {
        transaction.rollback();
        
        return {statusCode: 400, content: {
          error: `error.usercredential.create.${error.parent.sqlMessage.retrieveColumnFromSQLError()}`
        }}
      });
    
    return super.handleResponse(res, result);
  }
  
  read = async (model, req, res) => {    
    await super.read(model, req, res);
  }
  
  update = async (model, req, res) => {    
    const result = await super.update(model, req, res, false);
    
    if(result.error)
      return super.handleResponse(res, result);
    
    const authToken = generateAuthToken({
      id: req.user.ucId,
      updatedAt: Date.parse(result.content.model.updatedAt)
    });
    
    const accessToken = generateAccessToken({
      ucId: req.user.ucId,
      id: req.user.id,
      role: result.content.model.role
    });
    
    result.content = {
      ...result.content,
      authToken: authToken.token,
      accessToken: accessToken.token,
      authTokenExpires: accessToken.expires,
      accessTokenExpires: accessToken.expires,
    }
    
    super.handleResponse(res, result)
  }
  
  delete = async (model, req, res) => {    
    return super.delete(model, req, res);
  }
  
}

module.exports = UserCredentialService;