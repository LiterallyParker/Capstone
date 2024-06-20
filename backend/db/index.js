const { Client } = require("pg");
require("dotenv").config();

const production = process.env.NODE_ENV === "production"
const client = new Client(
  {
    host: production ? process.env.DATABASE_HOSTNAME : process.env.DEV_HOSTNAME,
    port: process.env.DATABASE_PORT,
    database: production ? process.env.DATABASE_HOSTNAME : process.env.DEV_DATABASE,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  }
);

module.exports = client;