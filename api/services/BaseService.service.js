const MySQL = require('../database/MySQL.database');
const StringHelper = require('../helpers/StringHelper.helper');
const { v4: generateUUID } = require('uuid');

class BaseService {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  static getRandomUUID = async (table) => {
    const uuid = generateUUID();
    
    console.log('table:', table);
    
    if(table){
      const sql = `SELECT 1 FROM ${table} WHERE id=${uuid.toString()}`;
      console.log('sql:', sql);
      const result = await MySQL.executeQuery(sql);
      console.log('result:', result);
    }
    
    return uuid;
  }
  
  // CREATE
  insert = async (params) => {
    const uuid = BaseService.getRandomUUID(this.table);
    
    return 'INSERT';
  }
  
  // READ
  select = async (params) => {
    console.log(params);
    
    return `SelectAll from: ${this.table} params: ${params}`;
  }
  
  // UPDATE
  update = async (params) => {
    console.log(params);
    
    return params;
  }
  
  // DELETE
  delete = async (params) => {
    
    return 'delete';
  }
  
}

module.exports = BaseService;