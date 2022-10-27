const DB = require('../database/db');
const UserAccountModel = require('../models/UserAccount.model');

class BaseService {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  // CREATE
  async create(model, req, res, sendResponse = true){
    const transaction = await DB.transaction();
    
    const result = await model.create(
      {...req.body.model},
      {
        transaction: transaction,
        include: req.searchParams?.include
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
        
    return this.handleResponse(res, result, sendResponse);
  }
  
  // READ
  async select(model, req, res, sendResponse = true){
    //TODO Verifier toutes les valeurs (req.body.where, etc...)
      
    if(req.searchParams.id){
      const result = await model.findByPk(req.searchParams.id, {
        include: req.searchParams?.include,
        where: req.searchParams?.where
      })
        .then(value => ({statusCode: 200, content: {model: value.toJSON()}}))
        .catch(error => ({statusCode: 400, content: {
          error: `error.${model.name}.get.error`
        }}));
        
        return this.handleResponse(res, result, sendResponse);
    }
    
    const result = await model.findAll({
      include: req.searchParams?.include,
      where: req.searchParams?.where
    })
      .then(value => ({statusCode: 200, content: {model: value.toJSON()}}))
      .catch(error => ({statusCode: 400, content: {
        error: `error.${model.name}.get.error`
      }}));
    
    return this.handleResponse(res, result, sendResponse);
  }
  
  // UPDATE
  async update(model, req, res, sendResponse = true){
    if(req.body?.model?.id){
      const result = await model.findByPk(req.body.model.id, {
        include: req.searchParams?.include,
        where: req.searchParams?.where
      })
      .then(async mdl => {
          console.log('req.searchParams?.include:', req.searchParams?.include);
          console.log(req.body.model);
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
          
          const transaction = await DB.transaction();
          
          return await mdl.update(req.body.model, {
            transaction: transaction,
            include: [
              ...req.searchParams?.include,
              {model: UserAccountModel, as: 'blockedUser', through: "blocked_useraccount"}
            ],
            where: req.searchParams?.where
          })
            .then(async value =>  {
              await transaction.commit();
              
              return {statusCode: 200, content: {model: value.toJSON()}}
            })
            .catch(async error => {
              if(transaction.finished !== 'commit')
                await transaction.rollback();
              
              if(error?.name === 'SequelizeUniqueConstraintError'){
                return {statusCode: 400, content: {
                  error: `error.${model.name}.update.${error.parent.sqlMessage.retrieveColumnFromSQLError()}`
                }}
              }
              
              return {statusCode: 400, content: {error : `error.${model.name}.create.error`}}; 
            });
              // ({statusCode: 400, content: {error: `error.${model.name}.put.error`}})
        })
        .catch(error => ({statusCode: 400, content: {error: `error.${model.name}.put.notFound`}}));
      
        return this.handleResponse(res, result, sendResponse);
    }
    
    return this.handleResponse(res, {statusCode: 405, content: {error: `UPDATE * FROM ${this.table}`}}, sendResponse);
  }
  
  // DELETE
  async delete(model, req, res, sendResponse = true){
    //TODO
    
    return this.handleResponse(res, {statusCode: 405, content: `DELETE ${params.id} FROM ${this.table}`}, sendResponse);
  }
  
  handleResponse(res, result, sendResponse = true){
    if(sendResponse)
      return res.status(result?.statusCode ?? 400).send(result?.content);
    
    return result;
  }
  
}

module.exports = BaseService;