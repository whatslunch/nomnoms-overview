const pg            = require('pg');
const copyFrom      = require('pg-copy-streams').from;
const fs            = require('fs');
const path          = require('path')
const {performance} = require('perf_hooks');

let t0 = performance.now();

pg.connect('postgres://localhost:5432/nomnoms', (err, client, done) => {
  client.query('DROP TABLE IF EXISTS restaurants');
  client.query('CREATE TABLE restaurants(id SERIAL PRIMARY KEY, name VARCHAR(100), lat DECIMAL(10, 6), lng DECIMAL(10, 6), address TEXT, cost INT, phone TEXT, website TEXT)')
    .on('end', () => {
      const pgslStream = client.query(copyFrom('COPY restaurants (name, lat, lng, address, cost, phone, website) FROM STDIN CSV HEADER'));
      const filePath = path.join(__dirname, './../seed/restaurants.csv');
      const fileStream = fs.createReadStream(filePath);
      fileStream.on('error',() => {console.log('filestream err'); done();});
      pgslStream.on('error', () => {console.log('pqsl stream err'); done();});
      pgslStream.on('end', () => {;
        let t1 = performance.now();
        console.log(`elapsed time (restaurants): ${((t1 - t0)/1000).toFixed(2)} seconds`);
        done();
      });
      fileStream.pipe(pgslStream);
    });
});

pg.connect('postgres://localhost:5432/nomnoms', (err, client, done) => {
  client.query('DROP TABLE IF EXISTS images');
  client.query('CREATE TABLE images(id SERIAL PRIMARY KEY, src VARCHAR(100), restaurant_id INTEGER)')
    .on('end', () => {
      const pgslStream = client.query(copyFrom('COPY images (src, restaurant_id) FROM STDIN CSV HEADER'));
      const filePath = path.join(__dirname, './../seed/images.csv');
      const fileStream = fs.createReadStream(filePath);
      console.log()
      fileStream.on('error',() => {console.log('filestream err'); done();});
      pgslStream.on('error', () => {console.log('pqsl stream err'); done();});
      pgslStream.on('end', () => {
        console.log('done loading images');
        client.query('ALTER TABLE images ADD CONSTRAINT constrain_fkey FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)');
        client.query('CREATE INDEX ON images (restaurant_id)', () => {
          let t1 = performance.now();
          console.log(`elapsed time (images): ${((t1 - t0)/1000).toFixed(2)} seconds`);
          done();
        });
      });
      fileStream.pipe(pgslStream);
    });
});

