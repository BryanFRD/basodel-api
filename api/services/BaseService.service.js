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
    const params = req.params;
    const query = (req.query.include ?? '').split(',');
    
    const include = Object.values(model.associations).filter((mdl) => query.includes(mdl.as));
    delete req.query.include;
    
    if(params.params){
      const result = await model.findByPk(params.params, {
        include: include,
        where: req.query
      })
        .then(value => ({statusCode: 200, content: {value}}))
        .catch(error => ({statusCode: 400, content: {
          error: `error.${model.name}.get.error`
        }}));
        
        return res.status(result.statusCode ?? 400).send(result.content);
    }
    
    const result = await model.findAll({
      include: include,
      where: req.query
    })
      .then(value => ({statusCode: 200, content: {value}}))
      .catch(error => ({statusCode: 400, content: {
        error: `error.${model.name}.get.error`
      }}));
    
    return res.status(result.statusCode ?? 400).send(result.content);
  }
  
  // UPDATE
  async update(model, req, res){
    if(req.user.id !== req.body?.model?.id && req.user?.role?.level >= 500)
      return res.sendStatus(401);
      
    const result = await model.findByPk(req.body.model.id)
      .then(async mdl => {
        
        if(req.body.model){
          Object.entries(req.body.model).forEach(([key, value]) => {
            if(typeof key !== 'string')
              return;
            
            const addFunction = mdl[`set${key.upperCaseFirst()}`];
            if(addFunction)
              mdl[`set${key.upperCaseFirst()}`](value);
          })
        }
        
        return await mdl.update(req.body.model)
          .then(value => ({statusCode201, content: {value}}))
          .catch(err => ({statusCode: 400, content: {error: `error.${model.name}.put.error`}}));
      })
      .catch(error => ({statusCode: 400, content: {error}}));
    
    return res.status(result.statusCode ?? 400).send(result.content);
  }
  
  // DELETE
  async delete(model, req, res){
    //TODO
    return res.status(405).send(`DELETE ${params.id} FROM ${this.table}`);
  }
  
}

module.exports = BaseService;