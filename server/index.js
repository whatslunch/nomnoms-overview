const express = require('express');
const path = require('path');
const parser = require('body-parser');
const dbHook = 1;
const db = require(`../database/db${dbHook}/index.js`);

const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.static(path.join(__dirname, '../public/')));
// app.use(express.json());
app.use(parser.json());
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

app.get('/restaurant', (req, res) => {
  db.Restaurant.getAll((err, data) => {
    if (err) res.status(500).send(err.message);
    else res.end(JSON.stringify(data));
  });
});

app.get('/restaurant/:id', (req, res) => {
  db.Restaurant.getOne(req.params.id, (err, data) => {
    if (err) res.status(500).send(err.message);
    else res.end(JSON.stringify(data));
  });
});

app.post('/restaurant', (req, res) => {
  db.Restaurant.addOne(req.body, (err, data) => {
    if (err) res.status(500).send(err.message);
    else res.end(JSON.stringify(data));
  });
});

app.put('/restaurant/:id', (req, res) => {
  db.Restaurant.updateOne(req.params.id, req.body, (err, data) => {
    if (err) res.status(500).send(err.message);
    else res.end(JSON.stringify(data));
  });
});

app.delete('/restaurant/:id', (req, res) => {
  db.Restaurant.deleteOne(req.params.id, (err, data) => {
    if (err) res.status(500).send(err.message);
    else res.end(JSON.stringify(data));
  });
}); 

app.listen(PORT, console.log('Listening on port:', PORT));
