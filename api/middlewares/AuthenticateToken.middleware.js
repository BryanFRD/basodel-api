const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
  const auth = req?.headers['authorization'];
  const token = auth?.split(' ')[1];
  
  if(!token)
    return res.sendStatus(401);
  
  await jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
    if(err || !user)
      return res.sendStatus(401);
    
    req.user = user;
  });
  
  if(req.user)
    next();
}

module.exports = authenticateToken;