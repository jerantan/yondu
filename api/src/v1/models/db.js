const MySql = require('sync-mysql');

const config = {
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  dateStrings: true
};

const connect = new MySql(config);

module.exports = {
  MySql, config, connect
};