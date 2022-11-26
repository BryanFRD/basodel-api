const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');

const authenticateToken = async (req, res, next) => {
  const method = req.method;
  const url = req.url.replace(/\/+$/, '').split('?')[0];
  
  const routeName = `${method.toUpperCase()}${url.toLowerCase()}`;
  const restrictedRoute = authConfig.RESTRICTED_ROUTES[routeName];
  
  if(restrictedRoute){
    const token = req.signedCookies.accessToken;
    
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if(!err)
        return user;
    });
    
    if(user && restrictedRoute({user, body: req.body})){
      req.user = user;
      return next();
    }
    
  } else {
    return next();
  }
  
  return res.sendStatus(401);
}

module.exports = authenticateToken;