const DB = require('../database/db');

class BaseService {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  // CREATE
  insert = async (model, req, res) => {
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
  select = async (model, req, res) => {
    //TODO Verifier toutes les valeurs (req.body.where, etc...)
    if(req.body.id){
      const result = model.findByPk(req.body.id)
        .then(value => ({statusCode: 200, content: {value}}))
        .catch(err => ({statusCode: 400, content: {err}}));
      
      return res.status(result.statusCode).send(result.content);
    }
    
    const result = model.findAll(req.body.where)
      .then(value => ({statusCode: 200, content: {value}}))
      .catch(error => ({statusCode: 400, content: {error}}));
      
    return res.status(result.statusCode).send(result.content);
  }
  
  // UPDATE
  update = async (model, req, res) => {
    //TODO
    return res.sendStatus(400);
  }
  
  // DELETE
  delete = async (model, req, res) => {
    //TODO
    return res.status(405).send(`DELETE ${params.id} FROM ${this.table}`);
  }
  
}

module.exports = BaseService;