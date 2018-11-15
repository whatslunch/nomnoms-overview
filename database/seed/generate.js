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
  const write = () => {
    while (i < n) {
      i += 1;
      console.log((i/n * 100).toFixed(2) + '%');
      let base = `${faker.company.companyName().replace(' LLC','').replace(' Inc','').replace(' Group','')}`;
      let pref = base.split(' ')[0] === 'The'? '': PREFIXES[getRandomBetween(PREFIXES.length - 1, 0, 0)];
      let suff = SUFFIXES[getRandomBetween(SUFFIXES.length - 1, 0, 0)];
      let inst = getRandomBetween(n - 1, 0, 0);
      let data = {
        id: i,
        name: `"${[pref, base, suff, inst].join(' ').split('  ').join(' ').trim()}"`,
        lat: getRandomBetween(37.720151, 37.785006, 6),
        lng: getRandomBetween(-122.397980, -122.498002, 6),
        address: `"${faker.fake('{{address.streetAddress}}, San Francisco, CA 941' + getRandomBetween(40, 10, 0))}"`,
        cost: getRandomBetween(5, 0, 0),
        phone: ['(415)', ' ', getRandomBetween(999, 100, 0), '-', getRandomBetween(9999, 1000, 0)].join(''),
        website: faker.internet.url(),
      }
      let row = '';
      ['id','name','lat','lng','address','cost','phone','website'].forEach((field) => {
        row += data[field] + ',';
      })
      row = row.slice(0, row.length - 1);
      row += '\r\n';
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

  stream.write(['id','name','lat','lng','address','cost','phone','website'].join(',') + '\r\n');
  write();
}

//   for (let i = 1; i <= n; i += 1) {

//     let base = `${faker.company.companyName().replace(' LLC','').replace(' Inc','').replace(' Group','')}`;
//     let pref = base.split(' ')[0] === 'The'? '': PREFIXES[getRandomBetween(PREFIXES.length - 1, 0, 0)];
//     let suff = SUFFIXES[getRandomBetween(SUFFIXES.length - 1, 0, 0)];
//     let inst = getRandomBetween(n - 1, 0, 0);
//     writer.write([
//       i,
//       `"${[pref, base, suff, inst].join(' ').replace('  ',' ').trim()}"`,
//       getRandomBetween(37.720151, 37.785006, 6),
//       getRandomBetween(-122.397980, -122.498002, 6),
//       `"${faker.fake('{{address.streetAddress}}, San Francisco, CA 941' + getRandomBetween(40, 10, 0))}"`,
//       getRandomBetween(5, 0, 0),
//       ['(415)', ' ', getRandomBetween(999, 100, 0), '-', getRandomBetween(9999, 1000, 0)].join(''),
//       faker.internet.url(),
//     ]);
//   }

//   writer.end();
// }

  // fs.writeFile('./database/seed/restaurants.csv', ['id','name','lat','lng','address','cost','phone','website'], 'utf8', () => {

  
  // for (let i = 1; i <= n; i += 1) {
  //   let base = `${faker.company.companyName().replace(' LLC','').replace(' Inc','').replace(' Group','')}`;
  //   let pref = base.split(' ')[0] === 'The'? '': PREFIXES[getRandomBetween(PREFIXES.length - 1, 0, 0)];
  //   let suff = SUFFIXES[getRandomBetween(SUFFIXES.length - 1, 0, 0)];
  //   let inst = getRandomBetween(n - 1, 0, 0);
  //   console.clear();
  //   console.log(`${(i/n * 100).toFixed(2)}%` );
  //   records.push({
  //     id: i,
  //     name: `"${[pref, base, suff, inst].join(' ').replace('  ',' ').trim()}"`,
  //     lat: getRandomBetween(37.720151, 37.785006, 6),
  //     lng: getRandomBetween(-122.397980, -122.498002, 6),
  //     address: `"${faker.fake('{{address.streetAddress}}, San Francisco, CA 941' + getRandomBetween(40, 10, 0))}"`,
  //     cost: getRandomBetween(5, 0, 0),
  //     phone: ['(415)', ' ', getRandomBetween(999, 100, 0), '-', getRandomBetween(9999, 1000, 0)].join(''),
  //     website: faker.internet.url(),
  //   });
  // }

// }

// const genImageSeed = (n) => {
//   let records = [];
//   for (let i = 0; i < n; i += 1) {
//     records.push({
      
//     });
//   }
//   return records;
// }

const restaurantSeed = genRestaurantSeed(10000000, () => {
  console.log('restaurants generated');
});

// arr2csv(restaurantSeed, ['id','name','lat','lng','address','cost','phone','website'], (err, csv) => {
//   fs.writeFile('./database/seed/restaurants.csv', csv, 'utf8', () => {
//     console.log('restaurants generated');
//   });
// });

