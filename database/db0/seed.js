const promise    = require('bluebird');
const mysql      = require('mysql');
const parse      = require('csv-parse');
const fs         = promise.promisifyAll(require('fs'));

const connection = mysql.createConnection({
  user: 'root',
  multipleStatements: true,
});
promise.promisifyAll(connection);

const initSchema = schema => connection.queryAsync(schema);
const queueSeeds = () => {
  queue = [];
  return (
    new Promise((resolve, reject) => {
      fs.createReadStream('./database/seed/restaurants.csv')
        .pipe(parse({ delimiter: ',', columns: true, relax_column_count: true}, (err, data) => {
          if (err) return reject(err);
          data.forEach(row => {
            queue.push(connection.queryAsync(
              'INSERT INTO restaurants (name, address, phone, website, lat, lng, cost) VALUES(?, ?, ?, ?, ?, ?, ?)',
              [row.name, row.address, row.phone, row.website, row.lat, row.lng, row.cost], () => {console.log(row.name)}
            ));
          });
        }));
    }, err => {
      if (err) reject(err);
      else resolve(queue);
    })
  )
}

promise.resolve(fs.readFileAsync('./database/db0/schema.sql', 'utf8'))
  .then(initSchema)
  .then(queueSeeds)
  .then(queue => {
    promise.all(queue)
    connection.end();
    return;
  });