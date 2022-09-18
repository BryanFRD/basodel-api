require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routers = require('./api/routers');
const DB = require('./api/database/db');
const Role = require('./api/models/Role.model');
const ReportStatus = require('./api/models/ReportStatus.model');
const jwt = require('jsonwebtoken');
const Logger = require('./api/helpers/Logger.helper');
const Mailer = require('./api/mails/Mailer.mail');

const start = async () => {
  const err = await DB.sync()
    .then(() => {Logger.log('Database synchronized!')})
    .catch(err => err);
  
  if(err){
    Logger.error(`Error while trying to synchronize with the database! \nError: ${err}`);
    return;
  }
  
  const app = express();
  
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
  
  app.use(cors(corsOptions)).use(morgan('dev')).use(express.json());
  
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
  
  app.listen(process.env.SERVER_PORT, () => Logger.info(`Basodel-API started on port ${process.env.SERVER_PORT}.`));
}

start();

//TODO Redis Cache pour les refreshTokens et ensuite une route logout ???

generateAccessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN, {expiresIn: '1d'});
}

generateRefreshToken = (data) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN, {expiresIn: '30d'});
}

generateEmailToken = (data) => {
  return jwt.sign(data, process.env.EMAIL_TOKEN, {expiresIn: '7d'});
}
