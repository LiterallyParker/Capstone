const client = require("./db/index.js");
const bcrypt = require("bcrypt");
const { instruments } = require("./data.js");
const { catagories } = require("./data.js");

async function seedTables(client) {

  console.log("Creating Tables...");

  try {

    await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS instruments;
    DROP TABLE IF EXISTS catagories;
    DROP TABLE IF EXISTS purchases;
    `);

    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      email VARCHAR(255),
      hash VARCHAR(255)
    )
    `);

    await client.query(`
    CREATE TABLE catagories(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      data JSON NOT NULL
    )
    `);

    await client.query(`
    CREATE TABLE instruments(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL NOT NULL,
      stock INT NOT NULL,
      catagory_id INT REFERENCES catagories(id) NOT NULL,
      data JSON NOT NULL
    )
    `);

    await client.query(`
    CREATE TABLE purchases(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) NOT NULL,
      total DECIMAL NOT NULL,
      items JSON NOT NULL
    )
    `)

    console.log("Tables Created.\n");

  } catch (err) {
    console.log(err);
  }

}

async function seedCatagories(client) {

  console.log("Seeding Catagories...");

  try {
    for (const catagory of catagories) {
      await client.query(`INSERT INTO catagories (name, data) VALUES ($1, $2)`,
        [catagory.name, catagory.data]);
    }
    console.log("Catagories Seeded.\n");
  } catch (error) {
    console.log(error);
  }
}

async function seedInstruments(client) {
  console.log("Seeding Instruments...");

  try {

    for (const instrument of instruments) {
      await client.query(
        `INSERT INTO instruments (name, price, stock, catagory_id, data) VALUES ($1, $2, $3, $4, $5)`,
        [instrument.name, instrument.price, instrument.stock, instrument.catagory_id, instrument.data]
      );
    };

    console.log("Instruments seeded.\n")

  } catch (error) {
    console.error(error);
  }
}

async function seedUsers(client) {
  console.log("Seeding Users...");

  try {

    const users = [
      {
        "first_name": "parker",
        "last_name": "townsend",
        "email": "email@website.com",
        "hash": await bcrypt.hash('password', 5)
      }
    ];

    for (const user of users) {
      await client.query(
        `INSERT INTO users (first_name, last_name, email, hash) VALUES ($1, $2, $3, $4)`,
        [user.first_name, user.last_name, user.email, user.hash]
      );
    };

    console.log("Users seeded.\n")

  } catch (error) {
    console.error(error)
  }
}

async function buildDb() {

  try {
    client.connect()
    await seedTables(client)
    await seedUsers(client)
    await seedCatagories(client)
    await seedInstruments(client)
    console.log("You're Doing Good!")
  } catch (error) {
    console.log(error)
  }

}

buildDb().catch(console.error).finally(() => client.end())