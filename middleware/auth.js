const jwt = require('jsonwebtoken');
const Users = require('../models/userSchema');

module.exports.checkUser = async (req, res, next) => {

 /* const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Unauthorized, please login first');

  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await Users.findById(user._id);
    next();
} catch (err) {
    return res.status(401).send('Invalid token');
}*/
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await Users.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};