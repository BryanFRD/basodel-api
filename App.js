require('dotenv').config();
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const morgan = require('morgan');
const routers = require('./api/routers');
const DB = require('./api/database/db');
const Role = require('./api/models/Role.model');
const ReportStatus = require('./api/models/ReportStatus.model');
const jwt = require('jsonwebtoken');
const Logger = require('./api/helpers/Logger.helper');
const events = require('./api/events');
const Mailer = require('./api/helpers/Mailer.mail');

const start = async () => {
  const err = await DB.sync({force: true})
    .then(() => {Logger.log('Database synchronized!')})
    .catch(err => err);
  
  if(err){
    Logger.error(`Error while trying to synchronize with the database!\nError: ${err}`);
    return;
  }
  
  const app = express();
  
  const corsOptions = {
    origin: process.env.APP_URL,
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
  
  const server = http.createServer(app);
  
  const io = new Server(server, {cors: corsOptions});
  
  server.listen(process.env.SERVER_PORT, () => Logger.info(`Basodel-API started on port ${process.env.SERVER_PORT}.`));
  
  io.on('connection', (socket) => {
    for(const event in events){
      new events[event](io, socket).getEvents().forEach(({name, handler}) => {
        socket.on(name, handler);
      })
    }
  });
  
  Mailer.sendConfirmationEmail('test', 'bryanferrando59@gmail.com');
}

start();

generateAccessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN, {expiresIn: '1d'});
}

generateRefreshToken = (data) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN, {expiresIn: '30d'});
}

generateEmailToken = (data) => {
  return jwt.sign(data, process.env.EMAIL_TOKEN, {expiresIn: '7d'});
}
