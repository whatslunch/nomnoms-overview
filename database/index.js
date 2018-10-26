var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'overview'
});

connection.connect();

module.exports = connection;


