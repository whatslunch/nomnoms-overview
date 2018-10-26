const express = require('express');
const app = express();
const path = require('path');
const db = require('../database/index.js');
const PORT = 9001;

app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.json());
app.use(express.urlencoded());


app.get('/:id', (req, res) => {
  var id = req.params.id;

  db.query(`SELECT * from images WHERE images.restaurant = ${id}`, (err, data) => {
    res.send(data);
  });

});


app.listen(PORT, console.log('Listening on port:', PORT));