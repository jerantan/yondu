const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

const schema = () => {
  const info = {
    stat: 0,
    msg: null,
    data: null
  };

  const data = models.schema();
  const len = data.length;

  if(len){
    const form = len > 1? 's' : '';
    info.stat = 1;
    info.msg = `Successfully created ${data.join(', ')} table${form}`;
  } else {
    info.msg = 'Tables already exist';
  }

  return info;
};

const signin = (input) => {
  const info = {
    stat: 0,
    msg: null,
    data: null
  };

  const { username, password } = input;
  const data = models.signin(username);
  const len = data.length;

  if(len && bcrypt.compareSync(password, data[0].password)){
    if(data[0].isactive){
      delete data[0].password;
      const token = jwt.sign(
        data[0],
        process.env.APIKEY,
        { expiresIn: '24h' }
      );
      data[0].token = token;

      info.stat = 1;
      info.msg = 'Successfully signed in';
      info.data = data;
    } else {
      info.stat = 0;
      info.msg = 'Your account is deactivated';
    }
  } else {
    info.stat = 0;
    info.msg = 'Either username or password is incorrect';
  }

  return info;
};

module.exports = {
  schema, signin
};