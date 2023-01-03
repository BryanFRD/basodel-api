const BaseService = require('./BaseService.service');

class UserAccountService extends BaseService {
  
  update = async (model, req, res) => {    
    const result = await super.update(model, req, res, false);
    
    const accessToken = generateAccessToken({
      ucId: req.user.ucId,
      id: req.user.id,
      role: result.content.model.role
    });
    
    res.cookie('accessToken', accessToken.token, {
      maxAge: accessToken.expires,
      signed: true,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development"
    });
    
    super.handleResponse(res, result)
  }
  
}

module.exports = UserAccountService;