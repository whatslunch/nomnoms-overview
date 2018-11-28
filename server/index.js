require('newrelic');
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const db = require(`../database/db2/index.js`);

const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.static(path.join(__dirname, '../public/')));
app.use(parser.json());

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/overview/:id', (req, res) => {
  db.Restaurant.findOne(req.params, (err, data) => {
    if (err) res.status(500).send(err.message);
    else res.end(JSON.stringify(data));
  });
});

// app.get('/restaurant', (req, res) => {
//   db.Restaurant.find({}, (err, data) => {
//     if (err) res.status(500).send(err.message);
//     else res.end(JSON.stringify(data));
//   });
// });

app.get('/restaurant/:id', (req, res) => {
  db.Restaurant.findOne(req.params, (err, data) => {
    if (err) res.status(500).send(err.message);
    else res.end(JSON.stringify(data));
  });
});

app.post('/restaurant', (req, res) => {
  console.log(req.body);
  db.Restaurant.insertMany(req.body, (err, data) => {
    if (err) res.status(500).send(err.message);
    else res.end(JSON.stringify(data));
  });
});

app.put('/restaurant/:id', (req, res) => {
  db.Restaurant.updateOne(req.params, req.body, (err, data) => {
    if (err) res.status(500).send(err.message);
    else res.end(JSON.stringify(data));
  });
});

app.delete('/restaurant/:id', (req, res) => {
  db.Restaurant.deleteOne(req.params, (err, data) => {
    if (err) res.status(500).send(err.message);
    else res.end(JSON.stringify(data));
  });
}); 

app.listen(PORT, console.log('Listening on port:', PORT));
