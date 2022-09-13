require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routers = require('./api/routers');
const DB = require('./api/db/db');
const Role = require('./api/models/Role.model');
const ReportStatus = require('./api/models/ReportStatus.model');
const jwt = require('jsonwebtoken');
const logger = require('./api/middlewares/Logger.middleware');

const start = async () => {
  const err = await DB.sync()
  .then(() => {console.log('Database synchronized!')})
  .catch(err => err);
  
  if(err){
    console.log(`Error while trying to synchronize with the database! \nError: ${err}`);
    return;
  }
  
  const app = express();
  
  /* TODO
    Problème quand on créé un compte, si une var dans user_credential existe ça n'empeche pas la création de user_account
    Avoir plus d'information les prob de création de compte
  */
  
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
  
  app.use(logger).use(cors(corsOptions)).use(morgan('dev')).use(express.json());
  
  for(const route in routers){
    app.use(`/${route}`, new routers[route]().router);
  }
  
  //TODO callback sur le .define pour créer cette ligne auto
  Role.findOrCreate({
    where: {id: '1'},
    defaults: {
      id: '1',
      title: 'role.default'
    }
  });
  
  ReportStatus.findOrCreate({
    where: {id: '1'},
    defaults: {
      id: '1',
      title: 'reportStatus.default'
    }
  })
  
  app.listen(process.env.SERVER_PORT, () => console.log(`Basodel-API started on port ${process.env.SERVER_PORT}.`));
}

start();

//TODO Redis Cache pour les refreshTokens et ensuite une route logout ???

generateAccessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN, {expiresIn: '15m'});
}

generateRefreshToken = (data) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN, {expiresIn: "30d"});
}
