const { Client } = require("pg");
require("dotenv").config();

const production = true
const client = new Client(
  {
    host: production ? process.env.DATABASE_HOSTNAME : process.env.DEV_HOSTNAME,
    port: process.env.DATABASE_PORT,
    database: production ? process.env.DATABASE_HOSTNAME : process.env.DEV_DATABASE,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  }
);

client.on("connect", () => {console.log("connected.")})
client.on("error", (error) => {
  console.log("error: ", error)
  process.exit(-1)
})

module.exports = client;