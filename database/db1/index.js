const pg = require('pg');

class Restaurant {
  
  constructor() {
    this.connectionString = 'postgres://localhost:5432/nomnoms';
  }

  getAll(cb) {
    pg.connect(this.connectionString, (err1, client, done) => {
      if(err1) cb(err1, null);
      const query = client.query(`SELECT * FROM restaurants`);
      query.on('error', err2 => { cb(err2, null); done(); });
      query.on('end', data => { cb(null, data); done(); });
    }
  }

  getOne(id, cb) {
    pg.connect(this.connectionString, (err1, client, done) => {
      if(err1) cb(err1, null);
      const query = client.query(query(`SELECT * FROM restaurants WHERE id = ${id}`);
      query.on('error', err2 => { cb(err2, null); done(); });
      query.on('end', data => { cb(null, data); done(); });
    }
  }

  addOne(opts, cb) {
    pg.connect(this.connectionString, (err1, client, done) => {
      if(err1) cb(err1, null);
    `INSERT INTO restaurants (${Object.keys(opts).join(', ')}) VALUES(?, ?, ?, ?, ?, ?, ?)`, Object.values(opts), cb);
  }

  updateOne(id, opts, cb) {
    this.connection.query(`UPDATE restaurants SET ${Object.keys(opts).map(key => key + ' = ?').join(', ')} WHERE id = ${id}`, Object.values(opts), cb);
  }

  deleteOne(opts, cb) {
    this.connection.query(`DELETE FROM restaurants WHERE id = ?`, opts, cb);
  }

}

module.exports.Restaurant = new Restaurant();