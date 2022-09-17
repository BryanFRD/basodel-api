const models = require('../models');
const services = require('../services');
const validators = require('../validators');

class BaseController {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name;
    this.model = models[this.table];
    this.service = new services[this.table]();
    this.validator = new validators[this.table]();
  }
  
  create = async (params) => {
    const validate = this.validator.validateCreate(params?.body?.model);
    if(!params?.body?.model || validate.error){
      return {
        statusCode: 400,
        content: {
          errorMessage: `error.${this.table}.create.${validate?.error?.details[0]?.path?.pop()}`
        }
      }
    }
    
    return await this.service.insert(this.model, params);
  }
  
  get = async (params) => {
    const validate = this.validator.validateGet(params?.body?.model);
    if(!params?.body?.model || validate.error){
      return {
        statusCode: 400,
        content: {
          errorMessage: `error.${this.table}.create.${validate?.error?.details[0]?.path?.pop()}`
        }
      }
    }
    
    return await this.service.select(this.model, params);
  }
  
  update = async (params) => {
    const validate = this.validator.validateUpdate(params?.body?.model);
    if(!params?.body?.model || validate.error){
      return {
        statusCode: 400,
        content: {
          errorMessage: `error.${this.table}.create.${validate?.error?.details[0]?.path?.pop()}`
        }
      }
    }
    
    return await this.service.update(this.model, params);
  }
  
  delete = async (params) => {
    const validate = this.validator.validateDelete(params?.body?.model);
    if(!params?.body?.model || validate.error){
      return {
        statusCode: 400,
        content: {
          errorMessage: `error.${this.table}.create.${validate?.error?.details[0]?.path?.pop()}`
        }
      }
    }
    
    return await this.service.delete(this.model, params);
  }
  
}

module.exports = BaseController;