const DB = require('../db/db');

class BaseService {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  // CREATE
  insert = async (model, params) => {
    if(!params?.body?.model){
      return {
        statusCode: 400,
        content: {
          error: 'error.somethingWentWrong',
          devError: 'model undefined'
        }
      }
    }
    
    const transaction = await DB.transaction();
    
    const result = await model.create(
      {...params.body.model},
      {
        transaction: transaction,
        include: [...Object.values(model.associations)]
      })
        .then(async model => {
          await transaction.commit();
          return {statusCode: 201, content: {model}}
        })
        .catch(async error => {
          await transaction.rollback();
          return {statusCode: 400, content: {error}}
        });
      
        console.log(result);
        
    return result;
  }
  
  // READ
  select = async (model, params) => {
    if(params?.body?.where?.id){
      const result = model.findByPk(params.body.where.id)
        .then(value => ({statusCode: 200, content: {value}}))
        .catch(err => ({statusCode: 400, content: {err}}));
      
      return result;
    }
    
    const result = model.findAll(params?.body)
      .then(value => ({statusCode: 200, content: {value}}))
      .catch(error => ({statusCode: 400, content: {error}}));
    
    return result;
  }
  
  // UPDATE
  update = async (model, params) => {
    //TODO
    return {statusCode: 400};
  }
  
  // DELETE
  delete = async (model, params) => {
    //TODO
    return {statusCode: 405, content: {err: `DELETE ${params.id} FROM ${this.table}`}};
  }
  
}

module.exports = BaseService;