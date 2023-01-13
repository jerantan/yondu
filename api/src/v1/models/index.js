const db = require('./db');

const schema = () => {
  // Assign config
  const config = JSON.parse(
    JSON.stringify(db.config)
  );

  // Remove database
  delete config.database;

  // New connection
  const connect = new db.MySql(config);

  // Create database
  let result = connect.query(`
    CREATE DATABASE IF NOT EXISTS ${process.env.DBNAME}
  `);

  const tables = [];

  // Load db schema
  const dbschema = require('./db.json');
  for(i of dbschema){
    const table = i.table;

    // Check table
    const data = db.connect.query(`
      SHOW TABLES LIKE '${table}'
    `);
  
    if(!data.length){
      tables.push(table);

      // Create table
      result = db.connect.query(`
        CREATE TABLE IF NOT EXISTS ${table} (${i.schema.join(' ')})
      `);

      // Create index
      if(i.index.length){
        for(i1 of i.index){
          result = db.connect.query(`
            CREATE INDEX ${i1} ON ${table} (${i1})
          `);
        }
      }
    }
  }

  const json = require('./data.json');
  result = db.connect.query(`
    INSERT IGNORE INTO users(${Object.keys(json)})
    VALUES('${Object.values(json).join("','")}')
  `);

  return tables;
};

const signin = (username) => {
  const result = db.connect.query(`
    SELECT id, firstname, lastname,
           username, password, level,
           isactive
    FROM users
    WHERE username = '${username}'
  `);
  return result;
};

module.exports = {
  schema, signin
};