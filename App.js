require('dotenv').config();
require('./api/helpers/StringHelper.helper');
const express = require('express');
// const cookieParser = require('cookie-parser');
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
const UserAccountModel = require('./api/models/UserAccount.model');
const { RoleModel } = require('./api/models');
const authenticateToken = require('./api/middlewares/AuthenticateToken.middleware');
const parseSearchParams = require('./api/middlewares/ParseSearchParams.middleware');

const start = async () => {
  const err = await DB.sync({force: false})
    .then(() => {Logger.success('Database synchronized!')})
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
  
  //TODO add cookies in response
  //? (Acces-Control.Allow.Credentials: 'true' in cors AND allowCredentials: true in axios)
  
  app
    .use(cors(corsOptions))
    .use(morgan('dev'))
    // .use(cookieParser())
    .use(express.json())
    .use(parseSearchParams)
    .use(authenticateToken);
  
  for(const route in routers){
    app.use(`/${route.replace('Router', '')}`, new routers[route]().router);
  }
  
  //TODO callback sur le .define pour créer cette ligne auto
  Role.findOrCreate({
    where: {id: 1},
    defaults: {
      id: 1,
      title: 'role.default',
      level: 1
    }
  });
  
  Role.findOrCreate({
    where: {id: 2},
    defaults: {
      id: 2,
      title: 'role.admin',
      level: 999
    }
  });
  
  ReportStatus.findOrCreate({
    where: {id: 1},
    defaults: {
      id: 1,
      title: 'reportStatus.default'
    }
  });
  
  const server = http.createServer(app);
  const io = new Server(server, {cors: corsOptions});
  
  server.listen(process.env.SERVER_PORT,
    () => Logger.info(`Basodel-API started on port ${process.env.SERVER_PORT}.`));
  
  io.on('connection', (socket) => {
    jwt.verify(socket.handshake.auth.token, process.env.ACCESS_TOKEN, async (err, user) => {
      const userAccount = await UserAccountModel.findByPk(user?.id, {include: [RoleModel]});
      const userJson = userAccount?.toJSON();
      
      for(const event in events){
        new events[event](io, socket, userJson).getEvents().forEach(({name, handler}) => {
          socket.on(name, handler);
        });
      }
    });
  })
}

start();

generateAuthToken = (data) => {
  return generateToken(data, 'AUTH_TOKEN', 30);
}

generateAccessToken = (data) => {
  return generateToken(data, 'ACCESS_TOKEN', 1);
}

generateEmailToken = (data) => {
  return generateToken(data, 'EMAIL_TOKEN', 7);
}

generateToken = (data, envKeyName, expDay) => {
  if(!process.env[envKeyName])
    return Logger.error(`Error in 'generateToken': env key not found: '${envKeyName}'`);
  
  const expires = expDay * 24 * 60 * 60;
  return {token: jwt.sign(data, process.env[envKeyName], {expiresIn: expires}), expires}
}