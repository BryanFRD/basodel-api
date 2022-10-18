const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');

const authenticateToken = async (req, res, next) => {
  const method = req.method;
  const url = req.url.replace(/\/+$/, '').split('?')[0];
  
  const routeName = `${method.toUpperCase()}${url.toLowerCase()}`;
  const restrictedRoutes = authConfig.RESTRICTED_ROUTES[routeName];
  
  if(restrictedRoutes){
    const auth = req?.headers['authorization'];
    const token = auth?.split(' ')[1];
    
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      console.log('err:', err);
      return user;
    });
    console.log('user:', user);
    
    if(user && restrictedRoutes({user: user, body: req.body})){
      req.user = user;
      return next();
    }
    
  } else {
    return next();
  }
  
  return res.sendStatus(401);
}

module.exports = authenticateToken;