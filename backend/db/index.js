const { Client } = require("pg");
require("dotenv").config();

const client = new Client(process.env.DATABASE_URL || "http://localhost:5432/capstone");

module.exports = client;