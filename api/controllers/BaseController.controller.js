const models = require('../models');
const services = require('../services');
const validators = require('../validators');

class BaseController {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name;
    this.prefix = this.name.toLocaleLowerCase();
    this.model = models[this.table];
    this.service = new services[this.table]();
    this.validator = new validators[this.table]();
  }
  
  async create(req, res){
    const {value, error} = this.validator.validateCreate(req?.body?.model);
    console.log('value:', value);
    console.log('error:', error);
    
    if(error){
      const key = error?.details[0]?.context?.key?.toLowerCase();
      
      return res.status(400).send({error: `error.${this.prefix}.create.${key}`});
    }
    
    req.body.model = value;
    return await this.service.create(this.model, req, res);
  }
  
  async select(req, res){
    const {value, error} = await this.validator.validateSelect(req?.body?.model);
    
    if(error){
      const key = error?.details[0]?.context?.key?.toLowerCase();
      
      return res.status(400).send({error: `error.${this.prefix}.select.${key}`});
    }
    
    req.body.model = value;
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