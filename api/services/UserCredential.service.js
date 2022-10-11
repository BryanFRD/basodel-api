const DB = require('../database/db');
const Mailer = require('../helpers/Mailer.mail');
const BaseService = require('./BaseService.service');

class UserCredentialService extends BaseService {
  
  create = async (model, req, res) => {
    const emailToken = generateEmailToken(req.body.model);
    
    Mailer.sendConfirmationEmail(emailToken.token, req.body.model.email);
    
    super.handleResponse(res, {statusCode: 201, content: {
      message: 'message.emailSent',
      confirmation: `${process.env.APP_URL}/confirmation/${emailToken.token}`
    }});
  }
  
  read = async (model, req, res) => {
    if(req.user.id !== req.body?.model?.id && req.user?.role?.level < 500)
      return res.sendStatus(401);
    
    await super.read(model, req, res);
  }
  
  update = async (model, req, res) => {
    if(req.user.ucId !== req.body?.model?.id && req.user?.role?.level < 500)
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
  
}

module.exports = UserCredentialService;