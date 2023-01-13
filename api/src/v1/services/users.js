const bcrypt = require('bcrypt');
const users = require('../models/users');

const getAll = () => {
  const info = {
    stat: 0,
    msg: null,
    data: null
  };

  const data = users.getAll();
  const len = data.length;

  if(len){
    info.stat = 1;
    info.msg = 'Users successfully pulled';
    info.data = data;
  } else {
    info.msg = 'No data found';
  }

  return info;
};

const getOne = (params) => {
  const info = {
    stat: 0,
    msg: null,
    data: null
  };

  const { userid } = params;
  const data = users.getOne({id: userid});
  const len = data.length;

  if(len){
    info.stat = 1;
    info.msg = 'User successfully pulled';
    info.data = data;
  } else {
    info.msg = 'No data found';
  }

  return info;
};

const create = (input) => {
  const info = {
    stat: 0,
    msg: null,
    data: null
  };

  const user = users.getOne({username: input.username});
  const userlen = user.length;

  if(userlen){
    info.msg = 'username: Already exist';
  } else {
    let pass = input.password;
    pass = bcrypt.hashSync(pass, 10);
    input.password = pass;

    const data = users.create(input);
    const len = Object.keys(data).length;

    if(len){
      info.stat = 1;
      info.msg = 'User successfully created';
      info.data = data;
    } else {
      info.msg = 'Something went wrong, try again';
    }
  }

  return info;
};

const update = (input, params) => {
  const info = {
    stat: 0,
    msg: null,
    data: null
  };

  const user = users.getOne({username: input.username});
  const userlen = user.length;

  const { userid } = params;
  if(userlen && userid != user[0].id){
    info.msg = 'username: Already exist';
  } else {
    let pass = input.password;
    // Password update is not required
    // but needs to standardize the validation
    // so to bypass noupdate value should set
    if(pass != 'noupdate'){
      pass = bcrypt.hashSync(pass, 10);
      input.password = pass;
    } else {
      delete input.password;
    }

    const data = users.update(input, userid);
    const len = Object.keys(data).length;

    if(len){
      info.stat = 1;
      info.msg = 'User successfully updated';
      info.data = data;
    } else {
      info.msg = 'Something went wrong, try again';
    }
  }

  return info;
};

const delOne = (params) => {
  const info = {
    stat: 0,
    msg: null,
    data: null
  };

  const { userid } = params;
  const data = users.delOne(userid);
  const len = Object.keys(data).length;

  if(len){
    info.stat = 1;
    info.msg = 'User successfully deleted';
    info.data = data;
  } else {
    info.msg = 'Something went wrong, try again';
  }

  return info;
};

const multiDel = (query) => {
  const info = {
    stat: 0,
    msg: null,
    data: null
  };

  const { ids } = query;
  const data = users.multiDel(ids);
  const len = Object.keys(data).length;

  if(len){
    info.stat = 1;
    info.msg = 'Users successfully deleted';
    info.data = data;
  } else {
    info.msg = 'Something went wrong, try again';
  }

  return info;
};

module.exports = {
  getAll, getOne, create,
  update, delOne, multiDel
};