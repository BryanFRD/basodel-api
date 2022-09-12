const StringHelper = require('../helpers/StringHelper.helper');
const { Sequelize } = require('sequelize');
const UserCredential = require('../models/UserCredential.model');
const UserAccount = require('../models/UserAccount.model');

class BaseService {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  // CREATE
  insert = async (model, params) => {
    if(!params?.body?.model)
      return {statusCode: 400};
      
    const result = await model.create(
      {...params.body.model},
      {include: [...Object.values(model.associations)]})
    .then(model => ({statusCode: 201, content: {model}}))
    .catch(error => ({statusCode: 400, content: {error}}));
    
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
      .catch(err => ({statusCode: 400, content: {err}}));
    
    return result;
  }
  
  // UPDATE
  update = async (model, params) => {
    return {statusCode: 400};
  }
  
  // DELETE
  delete = async (model, params) => {
    //TODO
    return {statusCode: 405, content: {err: `DELETE ${params.id} FROM ${this.table}`}};
  }
  
}

module.exports = BaseService;