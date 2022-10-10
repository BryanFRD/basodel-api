const DB = require('../database/db');
const Mailer = require('../helpers/Mailer.mail');
const BaseService = require('./BaseService.service');

class UserCredentialService extends BaseService {
  
  create = async (model, req, res) => {
    // const transaction = await DB.transaction();
    //
    // const result = await model.create(
    //   {
    //     ...req.body.model,
    //     roleId: 1
    //   },
    //   {
    //     transaction: transaction,
    //     include: [...Object.values(model.associations)]
    //   })
    //     .then(async model => {
    //       await transaction.commit();
    //       const {id, email} = model.toJSON();
          
    //       const emailToken = generateEmailToken({id});
          
    //       Mailer.sendConfirmationEmail(emailToken.token, email);
          
    //       return {statusCode: 201, content: {message: 'message.emailSent'}};
    //     })
    //     .catch(async error => {
    //       if(transaction.finished !== 'commit')
    //         await transaction.rollback();
          
    //       if(error?.name === 'SequelizeUniqueConstraintError'){
    //         return {statusCode: 400, content: {
    //           error: `error.usercredential.create.${error.parent.sqlMessage.retrieveColumnFromSQLError()}`
    //         }}
    //       }
          
    //       return {statusCode: 400, content: {error : 'error.usercredential.create.error'}};
    //     });
    
    const result = await super.create(model, req, res, false);
    
    if(result.error)
      return super.handleResponse(res, result);
      
    const emailToken = generateEmailToken({id: result.model.id});
    
    Mailer.sendConfirmationEmail(emailToken.token, result.model.email);
    
    super.handleResponse(res, {statusCode: 201, message: 'message.emailSent'});
  }
  
  read = async (model, req, res) => {
    if(req.user.id !== req.body?.model?.id && req.user?.roleLevel < 500)
      return res.sendStatus(401);
    
    await super.read(model, req, res);
  }
  
  update = async (model, req, res) => {
    if(req.user.ucId !== req.body?.model?.id && req.user?.roleLevel < 500)
      return res.sendStatus(401);
    
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
      roleLevel: result.content.model.role?.level ?? 0
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
  
}

module.exports = UserCredentialService;