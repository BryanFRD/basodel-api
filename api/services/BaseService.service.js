const StringHelper = require('../helpers/StringHelper.helper');
const { Sequelize } = require('sequelize');

class BaseService {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  static sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
    }
  );
  
  // CREATE
  insert = async (params) => {
    
    
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
  
}

module.exports = BaseService;