const mysql = require('mysql');

class Restaurant {
  
  constructor() {
    this.connection = mysql.createConnection({
      user: 'root',
      database: 'nomnoms',
    });
  }

  getAll(cb) {
    this.connection.query(`SELECT * FROM restaurants`, cb);
  }

  getOne(id, cb) {
    this.connection.query(`SELECT * FROM restaurants WHERE id = ${id}`, cb);
  }

  addOne(opts, cb) {
    this.connection.query(`INSERT INTO restaurants (${Object.keys(opts).join(', ')}) VALUES(?, ?, ?, ?, ?, ?, ?)`, Object.values(opts), cb);
  }

  updateOne(id, opts, cb) {
    this.connection.query(`UPDATE restaurants SET ${Object.keys(opts).map(key => key + ' = ?').join(', ')} WHERE id = ${id}`, Object.values(opts), cb);
  }

  deleteOne(opts, cb) {
    this.connection.query(`DELETE FROM restaurants WHERE id = ?`, opts, cb);
  }

}

module.exports.Restaurant = new Restaurant();