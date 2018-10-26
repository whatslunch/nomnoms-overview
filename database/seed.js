var faker = require('faker');
var db = require('./index.js');
// var AWS = require('aws-sdk'); not required

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const FOODCATEGORIES = ['food', 'drinks', 'food', 'food']; // 3/4th chance of food

const seed = (restaurants = 100) => {

  // seeding the restaurants table
  for (var i = 0; i < restaurants; i++) {

    var randomName = faker.company.companyName();
    var randomAddress = [faker.address.streetAddress(), faker.address.city(), faker.address.state(), faker.address.zipCode()].join(', ');
    var randomCost = getRandomInt(5) + 1;
    var query = 'INSERT INTO restaurants (name, address, cost) VALUE(?, ?, ?);';


    db.query(query, [randomName, randomAddress, randomCost], (err) => {
      if(err) {console.log(err);}
    })
  };

  // seeding the image table
  for (var j = 0; j < 500; j++) {

    var randomUser = faker.name.findName(); // Rowan Nikolaus
    var randomDescription = faker.lorem.sentences();
    var randomDate = faker.date.recent();
    var randomCategory = FOODCATEGORIES[getRandomInt(FOODCATEGORIES.length)];
    var randomRestaurant = getRandomInt(restaurants) + 1;
    if (randomCategory === 'food') {
      var randomImage = `https://s3-us-west-1.amazonaws.com/yump-sf-overview/${randomCategory}/${getRandomInt(18) + 1}.jpg`;
    } else if (randomCategory === 'drinks') {
      var randomImage = `https://s3-us-west-1.amazonaws.com/yump-sf-overview/${randomCategory}/${getRandomInt(7) + 1}.jpg`;
    }
    var query = 'INSERT INTO images (user, description, posted, category, restaurant, image) VALUE(?, ?, ?, ?, ?, ?);';
  
    // change to csv for back-end project
    db.query(query, [randomUser, randomDescription, randomDate, randomCategory, randomRestaurant, randomImage], (err) => {
      if(err) {console.log(err);}
    });

  };

};

seed(100);

setTimeout((function() {  
  return process.exit();
}), 2000);

