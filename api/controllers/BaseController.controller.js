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
  
  create = async (req, res) => {
    const {value, error} = await this.validator.validateCreate(req?.body?.model);
    
    console.log(value, error);
    
    if(error){
      return res.status(400)
        .send({error: `error.${this.table}.create.${error?.details[0]?.context?.key}`});
    }
    
    req.body.model = value;
    return await this.service.insert(this.model, req, res);
  }
  
  get = async (req, res) => {
    const {value, error} = await this.validator.validateGet(req?.body?.model);
    
    if(error){
      return res.status(400)
        .send({error: `error.${this.table}.get.${error?.details[0]?.context?.key}`});
    }
    
    req.body.model = value;
    return await this.service.insert(this.model, req, res);
  }
  
  update = async (req, res) => {
    const {value, error} = await this.validator.validateUpdate(req?.body?.model);
    
    if(error){
      return res.status(400)
        .send({error: `error.${this.table}.update.${error?.details[0]?.context?.key}`});
    }
    
    req.body.model = value;
    return await this.service.insert(this.model, req, res);
  }
  
  delete = async (req, res) => {
    const {value, error} = await this.validator.validateDelete(req?.body?.model);
    
    if(error){
      return res.status(400)
        .send({error: `error.${this.table}.delete.${error?.details[0]?.context?.key}`});
    }
    
    req.body.model = value;
    return await this.service.insert(this.model, req, res);
  }
  
}

module.exports = BaseController;