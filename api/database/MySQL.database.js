const { Sequelize } = require('sequelize');
const { v4: generateUUID } = require('uuid');

class MySQL {
  
  static randomUUID = async (table) => {
    const uuid = generateUUID();
    
    // if(table){
    //   const sql = `SELECT 1 FROM ${table} WHERE id='${uuid.toString()}'`;
    //   console.log(uuid.toString())
    //   const result = await MySQL.executeQuery(sql);
      
    //   if(result.length)
    //     return MySQL.getRandomUUID(table);
    // }
    
    return uuid;
  }
  
}

module.exports = MySQL;