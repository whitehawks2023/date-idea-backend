const ENV = process.env.NODE_ENV || 'development';
const {Pool} = require('pg')

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
})
const app = express();

app.use(express.json());


const config = {};
if (ENV === "production"){
  config.connectionString = process.env.MONGO_URI;
  config.max = 2;
}
module.exports = new Pool(config);


