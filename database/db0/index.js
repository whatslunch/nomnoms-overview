const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  database: 'nomnoms',
});

connection.connect();

module.exports = connection;
