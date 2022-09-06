const services = require('../services');

class BaseController {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name;
    this.service = new services[this.table]();
  }
  
  create = async (params) => {
    return await this.service.insert(params);
  }
  
  get = async (params) => {
    return await this.service.select(params);
  }
  
  update = async (params) => {
    return await this.service.update(params);
  }
  
  delete = async (params) => {
    return await this.service.delete(params);
  }
  
}

module.exports = BaseController;