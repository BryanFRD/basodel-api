require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const routers = require('./api/routers');
const DB = require('./api/db/db');

const start = async () => {
  const err = await DB.sync()
  .then(() => console.log('Database synchronized!'))
  .catch(err => err);
  
  if(err){
    console.log(`Error while trying to synchronize with the database! \nError: ${err}`);
    return;
  }
  
  const app = express();

  app.use(morgan('dev')).use(express.json());
  
  for(const route in routers){
    app.use(`/${route}`, new routers[route]().router);
  }
  
  
  app.listen(process.env.SERVER_PORT, () => console.log(`Basodel-API started on port ${process.env.SERVER_PORT}.`));
}

start();