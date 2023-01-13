const { body, validationResult } = require('express-validator');
const response = require('../utils/response');

const min = 6;
const lenmsg = `Requires atleast ${min} chars`;
const nummsg = 'Only accepts numbers';
const reqmsg = 'Cannot be empty';

const run = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const str = errors.array().map((a) => a.param+': '+a.msg);

    const info = {
      stat: 0,
      msg: str.join('\n'),
      data: null
    }

    res.status(400).send(response(info));
  } else {
    // The next() means proceed to next
    // function which is the success code
    next();
  }
};

module.exports = {
  min, lenmsg, nummsg,
  reqmsg, body, run,
  response
};