const DB = require('../database/db');

class BaseService {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  // CREATE
  async create(model, req, res, sendResponse = true){
    const transaction = await DB.transaction();
    
    if(req.body.model instanceof Array){
      const result = await model.bulkCreate(req.body.model)
        .then(async model => {
          await transaction.commit();
          return {statusCode: 201, content: model};
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
          console.log('error:', error);
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
      .then(value => ({statusCode: 200, content: {model: value}}))
      .catch(error => {({statusCode: 400, content: {
        error: `error.${model.name}.get.error`
      }})});
    
    return this.handleResponse(res, result, sendResponse);
  }
  
  // UPDATE
  async update(model, req, res, sendResponse = true){
    if(req.body?.model?.id){
      const result = await model.update(req.body.model, {
        where: {
          id: req.body.model.id
        }
      })
        .then(value => ({statusCode: 200, content: {model: value.toJson()}}))
        .catch(error => ({statusCode: 400, content: {
          error: `error.${model.name}.update.error`
        }}));
        
      return this.handleResponse(res, result, sendResponse);
    }
    
    return this.handleResponse(res, {statusCode: 405, content: {error: `error.${this.table}.update.error`}}, sendResponse);
  }
  
  // DELETE
  async delete(model, req, res, sendResponse = true){
    if(req.searchParams?.id){
      const result = await model.destroy({where: req.searchParams.id})
        .then(value => ({statusCode: 200}))
        .catch(error => ({statusCode: 400, content: {
          error: `error.${model.name}.delete.error`
        }}));
        
        return this.handleResponse(res, result, sendResponse);
    }
    
    return this.handleResponse(res, {statusCode: 405, content: `error.${this.table}.delete.error`}, sendResponse);
  }
  
  handleResponse(res, result, sendResponse = true){
    if(sendResponse)
      return res.status(result?.statusCode ?? 400).send(result?.content);
    
    return result;
  }
  
}

module.exports = BaseService;