const MySQL = require('../database/MySQL.database');
const StringHelper = require('../helpers/StringHelper.helper');

class BaseService {
  
  constructor(){
    this.name = this.constructor.name;
    this.table = this.name.toLowerCase();
  }
  
  // CREATE
  insert = async (params) => {
    const uuid = await MySQL.randomUUID(this.table);
    
    return {uuid};
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
    //TODO
    return `DELETE ${params.id} FROM ${this.table}`;
  }
  
}

module.exports = BaseService;