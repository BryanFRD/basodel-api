const DB = require('../database/db');
const ChatMessageModel = require('../models/ChatMessage.model');

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
    
    return res.status(result.statusCode ?? 400).send(result.content);
  }
  
  // READ
  async select(model, req, res){
    //TODO Verifier toutes les valeurs (req.body.where, etc...)
    
    console.log('req.params.params:', req.params.params);
    if(req.params.params){
      const result = await model.findByPk(req.params.params)
        .then(value => ({statusCode: 200, content: {value}}))
        .catch(error => ({statusCode: 400, content: {
          error: `error.${model.name}.get.error`
        }}));
        
        return res.status(result.statusCode ?? 400).send(result.content);
    }
    
    const result = await model.findAll({
      attributes: {exclude: ['chat_message']},
      include: [...Object.values(model.associations)],
      where: req.query
    })
      .then(value => ({statusCode: 200, content: {value}}))
      .catch(error => ({statusCode: 400, content: {
        error: `error.${model.name}.get.error`
      }}));
    
    console.log(req.query);
    console.log(req.params)
    
    return res.status(result.statusCode ?? 400).send(result.content);
  }
  
  // UPDATE
  async update(model, req, res){
    const result = await model.findByPk(req.body.model.id)
      .on('success', (mdl) => {
        delete req.body.model.id;
        mdl.update(req.body.model);
      });
    return res.status(result.statusCode ?? 400).send(result.content);
  }
  
  // DELETE
  async delete(model, req, res){
    //TODO
    return res.status(405).send(`DELETE ${params.id} FROM ${this.table}`);
  }
  
}

module.exports = BaseService;