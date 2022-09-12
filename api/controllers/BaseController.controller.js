const models = require('../models');
const validators = require('../validators');
const services = require('../services');

class BaseController {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name;
    this.model = models[this.name];
    this.validate = validators[this.name];
    this.service = new services[this.table]();
  }
  
  create = async (params) => {
    return await this.service.insert(this.model, params);
  }
  
  get = async (params) => {
    return await this.service.select(this.model, params);
  }
  
  update = async (params) => {
    return await this.service.update(this.model, params);
  }
  
  delete = async (params) => {
    return await this.service.delete(this.model, params);
  }
  
}

module.exports = BaseController;