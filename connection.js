const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
    path: `${__dirname}/./.env.${ENV}`,
  });


const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.MONGO_URI;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})


