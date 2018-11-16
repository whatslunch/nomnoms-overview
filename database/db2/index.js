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
      query.on('end', data => { cb(null, data.rows); done(); });
    });
  }

  getOne(id, cb) {
    pg.connect(this.connectionString, (err1, client, done) => {
      if(err1) cb(err1, null);
      const query = client.query(`SELECT * FROM restaurants WHERE id = ${id}`);
      query.on('error', err2 => { cb(err2, null); done(); });
      query.on('end', data => { cb(null, data.rows); done(); });
    });
  }

  addOne(opts, cb) {
    pg.connect(this.connectionString, (err1, client, done) => {
      if(err1) cb(err1, null);
      const query = client.query(`INSERT INTO restaurants (${Object.keys(opts).join(', ')}) VALUES(${Object.keys(opts).map((prop, i) => '$' + (i + 1)).join(', ')})`, Object.values(opts));
      query.on('error', err2 => { console.log(err2); cb(err2, null); done(); });
      query.on('end', data => { cb(null, data.rows); done(); });
    });
  }

  updateOne(id, opts, cb) {
    pg.connect(this.connectionString, (err1, client, done) => {
      if(err1) cb(err1, null);
      const query = client.query(`UPDATE restaurants SET ${Object.keys(opts).map((key, i) => key + ' = $' + (i + 1)).join(', ')} WHERE id = ${id}`, Object.values(opts));
      query.on('error', err2 => { cb(err2, null); done(); });
      query.on('end', data => { cb(null, data.rows); done(); });
    });
  }

  deleteOne(id, cb) {
    pg.connect(this.connectionString, (err1, client, done) => {
      if(err1) cb(err1, null);
      const query = client.query(`DELETE FROM restaurants WHERE id = ${id}`);
      query.on('error', err2 => { cb(err2, null); done(); });
      query.on('end', data => { cb(null, data.rows); done(); });
    });
  }
}

module.exports.Restaurant = new Restaurant();