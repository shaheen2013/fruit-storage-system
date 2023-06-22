const express = require('express');
const mongoose = require('mongoose');
const server = require('./src/interfaces/graphql/index');

const app = express();

mongoose.connect('mongodb://localhost:27017/fruitstorage', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log('Server listening on http://localhost:4000/graphql');
});
