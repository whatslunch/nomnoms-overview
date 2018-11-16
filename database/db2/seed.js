const pg            = require('pg');
const copyFrom      = require('pg-copy-streams').from;
const fs            = require('fs');
const path          = require('path')
const {performance} = require('perf_hooks');

let t0 = performance.now();

pg.connect('postgres://localhost:5432/nomnoms', (err, client, done) => {
  client.query('DROP TABLE IF EXISTS restaurants')
    .on('end', () => {
      client.query('CREATE TABLE IF NOT EXISTS restaurants(id SERIAL PRIMARY KEY, name VARCHAR(100), lat DECIMAL(10, 6), lng DECIMAL(10, 6), address TEXT, cost INT, phone TEXT, website TEXT)');
      const pgslStream = client.query(copyFrom('COPY restaurants (name, lat, lng, address, cost, phone, website) FROM STDIN CSV HEADER'));
      const filePath = path.join(__dirname, './../seed/restaurants.csv');
      const fileStream = fs.createReadStream(filePath);
      fileStream.on('error', done);
      pgslStream.on('error', done);
      pgslStream.on('end', () => {;
        let t1 = performance.now();
        console.log(`elapsed time (restaurants): ${((t1 - t0)/1000).toFixed(2)} seconds`);
        done();
      });
      fileStream.pipe(pgslStream);
    });
});

pg.connect('postgres://localhost:5432/nomnoms', (err, client, done) => {
  client.query('DROP TABLE IF EXISTS images')
    .on('end', () => {
      client.query('CREATE TABLE IF NOT EXISTS images(id SERIAL PRIMARY KEY, src VARCHAR(100), restaurant_id INTEGER REFERENCES restaurants(id))');
      const pgslStream = client.query(copyFrom('COPY images (src, restaurant_id) FROM STDIN CSV HEADER'));
      const filePath = path.join(__dirname, './../seed/images.csv');
      const fileStream = fs.createReadStream(filePath);
      fileStream.on('error', done);
      pgslStream.on('error', done);
      pgslStream.on('end', () => {
        let t1 = performance.now();
        console.log(`elapsed time (images): ${((t1 - t0)/1000).toFixed(2)} seconds`);
        done();
      });
      fileStream.pipe(pgslStream);
    });
});

