const fs = require('fs');

const faker = require('faker');
faker.locale = 'en_US';

// const arr2csv = require('./arr2csv.js');

const getRandomBetween = (max = 1, min = 0, fix = 0) => {
  return (Math.random() * (max - min) + min).toFixed(fix);
}

const getRandomVenueType = () => {
  return Math.random() < 0.75? 'Food': 'Drink';
}

const genRestaurantSeed = (n, cb) => {
  const stream = fs.createWriteStream('./database/seed/restaurants.csv');
  
  let i = 0;
  const PREFIXES = ['The', ''];
  const SUFFIXES = ['Kitchen', 'Inn', 'Tavern', 'Table', 'Bakery', 'Cafe', 'Pub', 'Place', '', '', '', '', '', ''];
  const COLUMNS  = ['name','lat','lng','address','cost','phone','website'];

  const write = () => {
    while (i < n) {
      i += 1;
      console.log((i/n * 100).toFixed(2) + '%');
      let base = `${faker.company.companyName().replace(' LLC','').replace(' Inc','').replace(' Group','')}`;
      let pref = base.split(' ')[0] === 'The'? '': PREFIXES[getRandomBetween(PREFIXES.length - 1, 0, 0)];
      let suff = SUFFIXES[getRandomBetween(SUFFIXES.length - 1, 0, 0)];
      let inst = getRandomBetween(n - 1, 0, 0);
      let data = {
        name: `"${[pref, base, suff, inst].join(' ').split('  ').join(' ').trim()}"`,
        lat: getRandomBetween(37.720151, 37.785006, 6),
        lng: getRandomBetween(-122.397980, -122.498002, 6),
        address: `"${faker.fake('{{address.streetAddress}}, San Francisco, CA 941' + getRandomBetween(40, 10, 0))}"`,
        cost: getRandomBetween(5, 0, 0),
        phone: ['(415)', ' ', getRandomBetween(999, 100, 0), '-', getRandomBetween(9999, 1000, 0)].join(''),
        website: faker.internet.url(),
      }
      let row = '';
      COLUMNS.forEach(field => {
        row += data[field] + ',';
      });
      row = row.slice(0, row.length - 1);
      row += '\n';
      if (!stream.write(row)) {
        return;
      }
      console.clear();
    }
    stream.end();
    cb();
  }

  stream.on('drain', () => {
    write();
  });

  stream.write(COLUMNS.join(',') + '\n');
  write();
}

const genImageSeed = (n, cb) => {
  const stream = fs.createWriteStream('./database/seed/images.csv');
  
  let i = 0;
  const COLUMNS  = ['src','restaurant_id'];

  const write = () => {
    while (i < n) {
      i += 1;
      console.log((i/n * 100).toFixed(2) + '%');
      let rows = '';
      for (let j = 0; j < 3; j += 1) {
        let data = {
          src: `https://s3.amazonaws.com/whats-lunch/images/${getRandomBetween(23, 0, 0)}.jpg`,
          restaurant_id: i,
        }
        let row = '';
        COLUMNS.forEach(field => {
          row += data[field] + ',';
        });
        rows += row.slice(0, row.length - 1);
        rows += '\n';
      }

      if (!stream.write(rows)) {
        return;
      }
      console.clear();
    }
    stream.end();
    cb();
  }
  
  stream.on('drain', () => {
    write();
  });

  stream.write(COLUMNS.join(',') + '\n');
  write();
}

genRestaurantSeed(10000000, () => {
  console.log('all done');
});

genImageSeed(10000000, () => {
  console.log('all done');
});

