const jwt = require('jsonwebtoken');


module.exports.checkUser =   (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).send("unauthoriezed login first ");

  try{

    req.user = jwt.verify(token, 'ibrahimchakernmjdkuegxbgdjshgjd');
    next()
  }catch(error){
    res.status(401).send('invalid token')
  
}
}
