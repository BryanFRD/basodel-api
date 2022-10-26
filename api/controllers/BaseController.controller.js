const models = require('../models');
const services = require('../services');
const validators = require('../validators');

class BaseController {
  
  constructor(requiredIncludes = [], exludedIncludes = []){
    this.requiredIncludes = requiredIncludes;
    this.exludedIncludes = exludedIncludes;
    
    this.name = this.constructor.name;
    this.table = this.name.replace('Controller', '');
    this.prefix = this.table.toLocaleLowerCase();
    this.model = models[`${this.table}Model`];
    this.service = new services[`${this.table}Service`]();
    this.validator = new validators[`${this.table}Validator`]();
  }
  
  async create(req, res){
    const {value, error} = this.validator.validateCreate(req?.body?.model);
    
    if(error){
      const key = error?.details[0]?.context?.key?.toLowerCase();
      
      return res.status(400).send({error: `error.${this.prefix}.create.${key}`});
    }
    
    req.body.model = value;
    
    return await this.service.create(this.model, req, res);
  }
  
  async select(req, res){
    return await this.service.select(this.model, req, res);
  }
  
  async update(req, res){
    const {value, error} = await this.validator.validateUpdate(req?.body?.model);
    
    if(error){
      const key = error?.details[0]?.context?.key?.toLowerCase();
      
      return res.status(400).send({error: `error.${this.prefix}.update.${key}`});
    }
    
    req.body.model = value;
    
    return await this.service.update(this.model, req, res);
  }
  
  async delete(req, res){
    const {value, error} = await this.validator.validateDelete(req?.body?.model);
    
    if(error){
      const key = error?.details[0]?.context?.key?.toLowerCase();
      
      return res.status(400).send({error: `error.${this.prefix}.delete.${key}`});
    }
    
    req.body.model = value;
    
    return await this.service.delete(this.model, req, res);
  }
  
}

module.exports = BaseController;