const promise    = require('bluebird');
const mysql      = require('mysql');
const fs         = promise.promisifyAll(require('fs'));

const connection = mysql.createConnection({
  user: 'root',
  multipleStatements: true,
});
promise.promisifyAll(connection);

promise.resolve(fs.readFileAsync('./database/db0/schema.sql', 'utf8'))
  .then(schema => connection.queryAsync(schema))
  .then(() => {
    connection.end();
  })