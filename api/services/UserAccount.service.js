const BaseService = require('./BaseService.service');

class UserAccountService extends BaseService {
  
  constructor(){
    super();
  }
  
  update = async (model, req, res) => {
    if(req.user.id !== req.body?.model?.id && req.user?.role?.level >= 500)
      return res.sendStatus(401);
    
    super.update(model, req, res);
  }
  
}

module.exports = UserAccountService;