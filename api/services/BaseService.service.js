const DB = require('../database/db');

class BaseService {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  // CREATE
  async create(model, req, res){
    const transaction = await DB.transaction();
    
    const result = await model.create(
      {...req.body.model},
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
    
    return res.status(result.statusCode).send(result.content);
  }
  
  // READ
  async select(model, req, res){
    //TODO Verifier toutes les valeurs (req.body.where, etc...)
    
    const result = await model.findAll()
    .then(value => ({statusCode: 200, content: {value}}))
    .catch(error => ({statusCode: 400, content: {error: `error.${model.replace('Model', '')}.get.error`}}));
      
    return res.status(result.statusCode ?? 400).send(result.content);
  }
  
  // UPDATE
  async update(model, req, res){
    //TODO
    return res.sendStatus(400);
  }
  
  // DELETE
  async delete(model, req, res){
    //TODO
    return res.status(405).send(`DELETE ${params.id} FROM ${this.table}`);
  }
  
}

module.exports = BaseService;