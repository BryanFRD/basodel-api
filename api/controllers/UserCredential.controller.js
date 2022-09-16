const BaseController = require('./BaseController.controller');

class UserCredential extends BaseController {
  
  create = async (params) => {
    const validate = this.validator.validateCreation(params?.body?.model);
    if(!params?.body?.model || validate.error){
      return {
        statusCode: 400,
        content: {
          errorMessage: `error.usercredential.create.${validate?.error?.details[0]?.path?.pop()}`
        }
      }
    }
    
    return await this.service.insert(this.model, params);
  }
  
  get = async (params) => {
    return await this.service.select(this.model, params);
  }
  
  update = async (params) => {
    return await super.update(params);
  }
  
  delete = async (params) => {
    return await super.delete(params)
  }
  
}

module.exports = UserCredential;