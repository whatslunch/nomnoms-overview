const mongoose      = require('mongoose');
const db            = mongoose.connect('mongodb://localhost/nomnoms',{ useNewUrlParser: true, useCreateIndex: true });

const RestaurantSchema = new mongoose.Schema({
  id: {type: Number, index: true},
  name: {type: String},
  lat: {type: Number},
  lng: {type: Number},
  address: {type: String},
  cost: {type: Number},
  phone: {type: String},
  website: {type: String},
  images: {type: Array},
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports.Restaurant = Restaurant;