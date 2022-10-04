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
          return {statusCode: 201, content: {model: model.toJSON()}}
        })
        .catch(async error => {
          if(transaction.finished !== 'commit')
            await transaction.rollback();
          
          if(error?.name === 'SequelizeUniqueConstraintError'){
            return {statusCode: 400, content: {
              error: `error.${model.name}.create.${error.parent.sqlMessage.retrieveColumnFromSQLError()}`
            }}
          }
          
          return {statusCode: 400, content: {error : `error.${model.name}.create.error`}};
        });
        
    return res.status(result.statusCode ?? 400).send(result.content);
  }
  
  // READ
  async select(model, req, res){
    //TODO Verifier toutes les valeurs (req.body.where, etc...)
    
    const include = Object.values(model.associations)
      .filter(({as}) => req.searchParams?.include?.includes(as));
      
    if(req.searchParams.id){
      const result = await model.findByPk(req.searchParams.id, {
        include: include,
        where: req.searchParams.where
      })
        .then(value => ({statusCode: 200, content: {model: value.toJSON()}}))
        .catch(error => ({statusCode: 400, content: {
          error: `error.${model.name}.get.error`
        }}));
        
      return res.status(result.statusCode ?? 400).send(result.content);
    }
    
    const result = await model.findAll({
      include: include,
      where: req.searchParams.where
    })
      .then(value => ({statusCode: 200, content: {model: value.toJSON()}}))
      .catch(error => ({statusCode: 400, content: {
        error: `error.${model.name}.get.error`
      }}));
    
    return res.status(result.statusCode ?? 400).send(result.content);
  }
  
  // UPDATE
  async update(model, req, res){
    const include = Object.values(model.associations)
      .filter(({as}) => req.searchParams?.include?.includes(as));
    
    if(req.searchParams.id){
      const result = await model.findByPk(req.searchParams.id, {
        include: include
      })
        .then(async mdl => {
          if(req.body.model){
            Object.entries(req.body.model).forEach(([key, value]) => {
              if(typeof key !== 'string')
                return;
              
              if(mdl[`set${key.upperCaseFirst()}`]){
                mdl[`set${key.upperCaseFirst()}`](value);
                delete req.body.model[key];
              }
            });
          }
          
          return await mdl.update(req.body.model, {
            include: include
          })
            .then(async value =>  ({statusCode: 200, content: {model: value.toJSON()}}))
            .catch(error => ({statusCode: 400, content: {error: `error.${model.name}.put.error`}}));
        })
        .catch(error => ({statusCode: 400, content: {error: `error.${model.name}.put.notFound`}}));
      
      return res.status(result.statusCode ?? 400).send(result.content);
    }
    
    return res.status(400).send(`UPDATE * FROM ${this.table}`);
  }
  
  // DELETE
  async delete(model, req, res){
    //TODO
    return res.status(405).send(`DELETE ${params.id} FROM ${this.table}`);
  }
  
}

module.exports = BaseService;