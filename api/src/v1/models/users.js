const db = require('./db');

const getAll = () => {
  const result = db.connect.query(`
    SELECT *
    FROM users
    WHERE id != 1
  `);
  return result;
};

const getOne = (input) => {
  const result = db.connect.query(`
    SELECT *
    FROM users
    WHERE ${Object.keys(input)} = '${Object.values(input)}'
  `);
  return result;
};

const create = (input) => {
  const result = db.connect.query(`
    INSERT INTO users(${Object.keys(input)})
    VALUES('${Object.values(input).join("','")}')
  `);
  return result;
};

const update = (input, id) => {
  let formatted = JSON.stringify(input);
  formatted = formatted.replace(/":/g, ' = ');
  formatted = formatted.replace(/,"/g, ', ');
  formatted = formatted.slice(2, -1);

  const result = db.connect.query(`
    UPDATE users SET ${formatted}
    WHERE id = ${id}
  `);
  return result;
};

const delOne = (id) => {
  const result = db.connect.query(`
    DELETE FROM users WHERE id = ${id}
  `);
  return result;
};

const multiDel = (ids) => {
  const result = db.connect.query(`
    DELETE FROM users WHERE id IN (${ids})
  `);
  return result;
};

module.exports = {
  getAll, getOne, create,
  update, delOne, multiDel
};