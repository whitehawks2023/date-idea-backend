const ENV = process.env.NODE_ENV || "development";
const { Pool } = require("pg");
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config({
  path: `${__dirname}/./.env.${ENV}`,
});

const mongoString = process.env.MONGO_URI;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("database name:", database.name);
});
const app = express();

app.use(express.json());

const config = {};
if (ENV === "production") {
  config.connectionString = process.env.MONGO_URI;
  config.max = 5;
}

module.exports = new Pool(config);
