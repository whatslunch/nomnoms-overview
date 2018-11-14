const fs = require('fs');

const faker = require('faker');
faker.locale = 'en_US';

const arr2csv = require('./arr2csv.js');

const getRandomBetween = (max = 1, min = 0, fix = 0) => {
  return (Math.random() * (max - min) + min).toFixed(fix);
}

const getRandomVenueType = () => {
  return Math.random() < 0.75? 'Food': 'Drink';
}

const genRestaurantSeed = (n) => {
  let records = [];
  for (let i = 0; i < n; i += 1) {
    records.push({
      name: `"${faker.company.companyName().replace('LLC','Inn').replace('Inc','Kitchen').replace('Group','Table')}"`,
      lat: getRandomBetween(37.720151, 37.785006, 6),
      lng: getRandomBetween(-122.397980, -122.498002, 6),
      street: faker.address.streetAddress(),
      city: 'San Francisco',
      state: 'CA',
      zip: '941' + getRandomBetween(40, 10, 0),
      cost: getRandomBetween(5, 1, 0),
      phone: ['(415)', ' ', getRandomBetween(999, 100, 0), '-', getRandomBetween(9999, 1000, 0)].join(''),
      website: faker.internet.url(),
    });
  }
  return records;
}

const genImageSeed = (n) => {
  let records = [];
  for (let i = 0; i < n; i += 1) {
    records.push({
      
    });
  }
  return records;
}

const restaurantSeed = genRestaurantSeed(1000);

arr2csv(restaurantSeed, ['name','lat','lng','street','city','state','zip','cost','phone','website'], (err, csv) => {
  fs.writeFile('./database/seed/restaurants.csv', csv, 'utf8', () => {
    console.log('restaurants generated');
  });
});

