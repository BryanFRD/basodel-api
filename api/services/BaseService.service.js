const MySQL = require('../database/MySQL.database');
const DateHelper = require('../helpers/DateHelper.helper');
const StringHelper = require('../helpers/StringHelper.helper');

class BaseService {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  
  
  // CREATE
  insert = async (params) => {
    const uuid = await MySQL.randomUUID(this.table);
    
    return {statusCode: 400};
  }
  
  // READ
  select = async (params) => {
    console.log(params);
    
    return {statusCode: 400};
  }
  
  // UPDATE
  update = async (params) => {
    console.log(params);
    
    return {statusCode: 400};
  }
  
  // DELETE
  delete = async (params) => {
    //TODO
    return {statusCode: 405, content: `DELETE ${params.id} FROM ${this.table}`};
  }
  
  toSQLString = (key, value) => {
    if(key.toString().endWith('Date')){
      DateHelper.toSQL(new Date(value));
    }
    
    return value;
  }
  
  fromSQLString = (value) => {
    
  }
  
}

module.exports = BaseService;