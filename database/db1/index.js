const pg = require('pg');

class Restaurant {
  
  constructor() {
    this.connectionString = 'postgres://localhost:5432/nomnoms';
  }

  findOneWithImages(opts, cb) {
    pg.connect(this.connectionString, (err, client, done) => {
      const query = client.query(`SELECT * from images WHERE images.restaurant = ${opts.id}`)
      query.on('error', err => { cb(err, null); done(); });
      query.on('end', restaurant => { 
        cb(null, data.rows);
        const query = client.query(`SELECT * from images WHERE images.restaurant = ${opts.id}`)
        query.on('error', err => { cb(err, null); done(); });
        query.on('end', data => { 
          done();
        });
      });
    });



  //   db.query(`SELECT * from images WHERE images.restaurant = ${opts.id}`, (err, images) => {
  //     if (err) res.status(500).send(err.message);
  //     db.query(`SELECT * from restaurants WHERE id = ${opts.id}`, (err, restaurants) => {
  //       if (err) res.status(500).send(err.message);
  //       res.send({images, restaurants});
  //     });
  //   });
  // }

  // find(_, cb) {
  //   pg.connect(this.connectionString, (err, client, done) => {
  //     if(err) cb(err, null);
  //     const query = client.query(`SELECT * FROM restaurants`);
  //     query.on('error', err => { cb(err, null); done(); });
  //     query.on('end', data => { cb(null, data.rows); done(); });
  //   });
  // }

  findOne(id, cb) {
    pg.connect(this.connectionString, (err, client, done) => {
      if(err) cb(err, null);
      const query = client.query(`SELECT * FROM restaurants WHERE id = ${id}`);
      query.on('error', err => { cb(err, null); done(); });
      query.on('end', data => { cb(null, data.rows); done(); });
    });
  }

  insertMany(opts, cb) {
    pg.connect(this.connectionString, (err, client, done) => {
      if(err) cb(err, null);
      const query = client.query(`INSERT INTO restaurants (${Object.keys(opts).join(', ')}) VALUES(${Object.keys(opts).map((prop, i) => '$' + (i + 1)).join(', ')})`, Object.values(opts));
      query.on('error', err => { console.log(err); cb(err, null); done(); });
      query.on('end', data => { cb(null, data.rows); done(); });
    });
  }

  updateOne(id, opts, cb) {
    pg.connect(this.connectionString, (err, client, done) => {
      if(err) cb(err, null);
      const query = client.query(`UPDATE restaurants SET ${Object.keys(opts).map((key, i) => key + ' = $' + (i + 1)).join(', ')} WHERE id = ${{id}}`, Object.values(opts));
      query.on('error', err => { cb(err, null); done(); });
      query.on('end', data => { cb(null, data.rows); done(); });
    });
  }

  deleteOne(id, cb) {
    pg.connect(this.connectionString, (err, client, done) => {
      if(err) cb(err, null);
      const query = client.query(`DELETE FROM restaurants WHERE id = ${{id}}`);
      query.on('error', err => { cb(err, null); done(); });
      query.on('end', data => { cb(null, data.rows); done(); });
    });
  }
}

module.exports.Restaurant = new Restaurant();