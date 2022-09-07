const StringHelper = require('../helpers/StringHelper.helper');
const { Sequelize } = require('sequelize');

class BaseService {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  // CREATE
  insert = async (model, validate, params) => {
    const { error } = validate(params.body.model);
    
    if(!params?.body?.model || error)
      return {statusCode: 400, content: {error}};
      
    const result = await model.create({...params.body.model})
    .then(model => ({statusCode: 201, content: {model}}))
    .catch(err => ({statusCode: 400, content: {err}}));
    
    return result;
  }
  
  // READ
  select = async (model, validate, params) => {
    return {statusCode: 400};
  }
  
  // UPDATE
  update = async (model, validate, params) => {
    return {statusCode: 400};
  }
  
  // DELETE
  delete = async (model, validate, params) => {
    //TODO
    return {statusCode: 405, content: {err: `DELETE ${params.id} FROM ${this.table}`}};
  }
  
}

module.exports = BaseService;