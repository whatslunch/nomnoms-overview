const express = require('express');
const path = require('path');

const dbHook = 0;
const db = require(`../database/db${dbHook}/index.js`);

const app = express();
const PORT = process.env.PORT || 9001;

app.use('/:id', express.static(path.join(__dirname, '../public/')));

// app.use(express.json());
// app.use(express.urlencoded());

// app.get('/:id', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.get('/api/:id', (req, res) => {
  db.query(`SELECT * from images WHERE images.restaurant = ${req.params.id}`, (err1, images) => {
    if (err1) res.status(500).send(err1.message);
    db.query(`SELECT * from restaurants WHERE id = ${req.params.id}`, (err2, restaurants) => {
      if (err2) res.status(500).send(err2.message);
      res.send({images, restaurants});
    });
  });
});

app.listen(PORT, console.log('Listening on port:', PORT));
