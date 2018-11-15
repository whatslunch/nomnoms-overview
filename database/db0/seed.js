const promise       = require('bluebird');
const mysql         = require('mysql');
const fs            = promise.promisifyAll(require('fs'));
const {performance} = require('perf_hooks');

let t0 = performance.now();
const connection = mysql.createConnection({
  user: 'root',
  multipleStatements: true,
});
promise.promisifyAll(connection);

promise.resolve(fs.readFileAsync('./database/db0/schema.sql', 'utf8'))
  .then(schema => connection.queryAsync(schema))
  .then(() => {
    let t1 = performance.now();
    connection.end();
    console.log(`elapsed time: ${((t1 - t0)/1000).toFixed(0)} seconds`);
  })