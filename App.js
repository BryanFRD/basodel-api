require('dotenv').config();
require('./api/helpers/StringHelper.helper');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');
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
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const query = require('./api/graphql/schemas/query');
const mutation = require('./api/graphql/schemas/mutation');

const start = async () => {
  const err = await DB.sync({force: false})
  .then(() => {Logger.success('Database synchronized!')})
  .catch(err => err);
  
  if(err){
    Logger.error(`Error while trying to synchronize with the database!\nError: ${err}`);
    return;
  }
  
  let httpsOptions;
  let httpsOptionsError;
  try {
    httpsOptions = {
      key: fs.readFileSync(process.env.KEY_FILEPATH ?? 'key.pem'),
      cert: fs.readFileSync(process.env.CERT_FILEPATH ?? 'cert.pem')
    }
  } catch(e) {
    Logger.error('HTTPS options failed to synchronize');
    httpsOptionsError = e;
  }
  
  const app = express();
  
  const corsOptions = {
    origin: process.env.APP_URL,
    credentials: true,
    optionsSuccessStatus: 200
  }
  
  app.get('/', (req, res) => {
    res.status(200).send({
      key: process.env.KEY_FILEPATH,
      cert: process.env.CERT_FILEPATH,
      httpsOptions: !!httpsOptions,
      httpsOptionsError
    });
  });
  
  app
    .use(cors(corsOptions))
    .use(cookieParser(process.env.COOKIE_SECRET))
    .use(express.json())
    .use(authenticateToken)
    .use('/graphql', graphqlHTTP({
      schema: new GraphQLSchema({query, mutation}),
      graphiql: true,
    }));
    
  for(const route in routers){
    app.use(`/${route.replace('Router', '')}`, new routers[route]().router);
  }
  
  //TODO callback sur le .define pour créer cette ligne auto
  Role.findOrCreate({
    where: {id: '1562b051-484b-43aa-ac51-0e57846668c0'},
    defaults: {
      id: '1562b051-484b-43aa-ac51-0e57846668c0',
      title: 'role.default',
      level: 1
    }
  });
  
  Role.findOrCreate({
    where: {id: '5162b051-484b-43aa-ac51-0e57846668c0'},
    defaults: {
      id: '5162b051-484b-43aa-ac51-0e57846668c0',
      title: 'role.admin',
      level: 999
    }
  });
  
  ReportStatus.findOrCreate({
    where: {id: '1232b051-484b-43aa-ac51-0e57846668c0'},
    defaults: {
      id: '1232b051-484b-43aa-ac51-0e57846668c0',
      title: 'reportStatus.default'
    }
  });
  
  const server = http.createServer(app);
  const httpsServer = https.createServer(httpsOptions, app);
  
  const io = new Server(httpsOptions ? httpsServer : server, {cors: corsOptions});
  
  server.listen(process.env.API_PORT);
  httpsServer.listen(process.env.API_PORT_HTTPS);
  
  io.on('connection', (socket) => {
    const token = cookieParser.signedCookie(cookie.parse(socket.handshake.headers.cookie ?? '').accessToken, process.env.COOKIE_SECRET);
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
      const userAccount = await UserAccountModel.findByPk(user?.id, {include: [RoleModel]});
      const userJson = userAccount?.toJSON();
      
      for(const event in events){
        new events[event](io, socket, userJson).getEvents().forEach(({name, handler}) => {
          socket.on(name, handler);
        });
      }
    });
  });
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
  
  const expires = expDay * 24 * 60 * 60 * 1000;
  return {token: jwt.sign(data, process.env[envKeyName], {expiresIn: expires}), expires}
}