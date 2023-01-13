const jwt = require('jsonwebtoken');
const response = require('../utils/response');

const verify = (req, res, next) => {
  const info = {
    stat: 0,
    msg: null,
    data: null
  };

  const token = req.headers.authorization;
  if(!token){
    info.msg = 'No token found';
    res.status(403).send(
      response(info)
    );
  } else {
    try {
      const data = jwt.verify(token, process.env.APIKEY);
      req.user = data;
      next();
    } catch(err){
      info.msg = 'Invalid token';
      res.status(401).send(
        response(info)
      );
    }
  }
};

module.exports = verify;