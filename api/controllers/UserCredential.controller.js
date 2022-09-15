const BaseController = require('./BaseController.controller');

class UserCredential extends BaseController {
  
  create = async (params) => {
    if(validator.validateCreation(params.model))
    
    return await super.insert(this.model, params);
  }
  
  get = async (params) => {
    return await super.select(this.model, params);
  }
  
  update = async (params) => {
    return await super.update(this.model, params);
  }
  
  delete = async (params) => {
    return await super.delete(this.model, params)
  }
  
}

module.exports = UserCredential;