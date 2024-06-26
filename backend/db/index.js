const { Client } = require("pg");
require("dotenv").config();

// const production = process.env.NODE_ENVIRONMENT === "production";
// const production = true
// const client = new Client(
  // {
  //   // host: production ? process.env.DATABASE_HOSTNAME : process.env.DEV_HOSTNAME,
  //   port: process.env.DATABASE_PORT,
  //   database: production ? process.env.DATABASE_HOSTNAME : process.env.DEV_DATABASE,
  //   user: process.env.DATABASE_USERNAME,
  //   password: process.env.DATABASE_PASSWORD,
  //   ssl: { rejectUnauthorized: false }
  // }
// );
let connectionString = process.env.DATABASE_URL;

if (process.env.NODE_ENV === "dev") {
  connectionString = process.env.DEV_DATABASE_URL
}

const client = new Client({connectionString, ssl:{rejectUnauthorized:false}});

client.on("connect", () => {console.log("connected.")});
client.on("error", (error) => {
  console.log("Error Parker: ", error);
  process.exit(-1);
});

module.exports = client;