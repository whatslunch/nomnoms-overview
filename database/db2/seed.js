const fs            = require('fs');
const LineInput     = require('line-input-stream');
const async         = require('async');
const path          = require('path');
const {performance} = require('perf_hooks');

const mongoose      = require('mongoose');
const Restaurant    = require('./index.js').Restaurant;

let t0 = performance.now();

const getRandomBetween = (max = 1, min = 0, fix = 0) => {
  return (Math.random() * (max - min) + min).toFixed(fix);
}

/////// =>
const stream = LineInput(fs.createReadStream(path.join(__dirname, './../seed/restaurants.csv')));
stream.setDelimiter('\n');

mongoose.connection.on('open', (err, conn) => {
  Restaurant.collection.drop(() => {
    let bulk = Restaurant.collection.initializeOrderedBulkOp();
    let counter = 0;
    
    //err
    stream.on('error', err => { console.log(err) });
    
    //line
    stream.on('line', line => {
      let row = line.split(',');
      let obj = {
        id: counter,
        name: row[0],
        lat: row[1],
        lng: row[2],
        address: row[3],
        cost: row[4],
        phone: row[5],
        website: row[6],
        images: [],
      }
      for (let j = 0; j < 3; j += 1) {
        obj.images.push(`https://s3.amazonaws.com/whats-lunch/images/${getRandomBetween(23, 0, 0)}.jpg`);
      }
      bulk.insert(obj);
      
      counter += 1;

      if (counter % 1000 === 0) {
        console.log((counter/10000000 * 100) + '%');
        stream.pause();
        bulk.execute(err => {
          if (err) console.log(err);
          else {
            bulk = Restaurant.collection.initializeOrderedBulkOp();
            stream.resume();
            console.clear();
          }
        });
      }
    });

    //end
    stream.on('end', () => {
      let t1 = performance.now();
      console.log(`elapsed time (restaurants): ${((t1 - t0)/1000).toFixed(2)} seconds`);
      mongoose.connection.close();
    });
  });
});