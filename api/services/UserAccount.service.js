const BaseService = require('./BaseService.service');

class UserAccountService extends BaseService {
  
  constructor(){
    super();
  }
  
  update = async (model, req, res) => {
    if(req.user.id !== req.body?.model?.id && req.user?.roleLevel < 500)
      return res.sendStatus(401);
    
    const result = await super.update(model, req, res, false);
    
    const accessToken = generateAccessToken({
      ucId: req.user.ucId,
      id: req.user.id,
      roleLevel: result.content.model.role.level ?? 0
    });
    
    result.content = {
      ...result.content,
      accessToken: accessToken.token,
      accessTokenExpires: accessToken.expires,
    }
    
    super.handleResponse(res, result)
  }
  
}

module.exports = UserAccountService;