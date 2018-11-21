const mysql = require('mysql');

class Restaurant {
  
  constructor() {
    this.connection = mysql.createConnection({
      user: 'root',
      database: 'nomnoms',
    });
  }

  // find(_, cb) {
  //   this.connection.query(`SELECT * FROM restaurants`, cb);
  // }

  findOneWithImages(opts, cb) {
    db.query(`SELECT * from images WHERE images.restaurant = ${opts.id}`, (err1, images) => {
      if (err1) res.status(500).send(err1.message);
      db.query(`SELECT * from restaurants WHERE id = ${opts.id}`, (err2, restaurants) => {
        if (err2) res.status(500).send(err2.message);
        res.send({images, restaurants});
      });
    });
  }

  findOne(opts, cb) {
    this.connection.query(`SELECT * FROM restaurants WHERE id = ${opts.id}`, cb);
  }

  insertMany(opts, cb) {
    this.connection.query(`INSERT INTO restaurants (${Object.keys(opts).join(', ')}) VALUES(?, ?, ?, ?, ?, ?, ?)`, Object.values(opts), cb);
  }

  updateOne(id, opts, cb) {
    this.connection.query(`UPDATE restaurants SET ${Object.keys(opts).map(key => key + ' = ?').join(', ')} WHERE id = ${id }`, Object.values(opts), cb);
  }

  deleteOne(id, cb) {
    this.connection.query(`DELETE FROM restaurants WHERE id = ${id }`, cb);
  }

}

module.exports.Restaurant = new Restaurant();