const mysql = require('mysql');

class MySQL {
  
  static connectionPool;
  
  static getConnection = () => {
    if(!MySQL.connectionPool){
      MySQL.connectionPool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      });
    }
    
    return MySQL.connectionPool;
  }
  
  static executeQuery = async (sql) => {
    const result = await new Promise((res, rej) => {
      MySQL.getConnection().query(sql, (err, rows) => {
        return err ? rej(err) : res(rows);
      });
    });
    
    return result;
  }
  
}

module.exports = MySQL;