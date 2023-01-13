const response = require('../utils/response');

const info = {
  stat: 0,
  msg: null,
  data: null
};

const admin = (req, res, next) => {
  const { level } = req.user;
  if(level === 'Admin'){
    next();
  } else {
    info.msg = 'Admin access only';
    res.status(403).send(
      response(info)
    );
  }
};

const noguests = (req, res, next) => {
  const { level } = req.user;
  if(level === 'Admin'
  || level === 'Assistant'){
    next();
  } else {
    info.msg = 'Guests access not allowed';
    res.status(403).send(
      response(info)
    );
  }
};

module.exports = {
  admin, noguests
}