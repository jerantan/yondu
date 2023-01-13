const date = require('date-and-time');

const config = {
  timeZone: 'Asia/Manila'
  // hour12: false
};
const now = new Date().toLocaleString('en', config);

const format = 'YYYY-MM-DD HH:mm:ss';
const datetime = date.format(new Date(now), format);

module.exports = datetime;