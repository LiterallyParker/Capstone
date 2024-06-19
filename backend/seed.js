const bcrypt = require('bcrypt')
const client = require("./db/index.js");
const { instruments } = require("./data.js");
const { categories } = require("./data.js");
const { createUser } = require("./db/users.js");

async function seedTables(client) {

  console.log("Creating Tables...");

  try {

    await client.query(`
    DROP TABLE IF EXISTS purchases;
    DROP TABLE IF EXISTS instruments;
    DROP TABLE IF EXISTS catagories;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS users;
    `);

    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      hash VARCHAR(255) NOT NULL
    );`);

    await client.query(`
    CREATE TABLE categories(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );`);

    await client.query(`
    CREATE TABLE instruments(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL NOT NULL,
      stock INT NOT NULL,
      category_id INT REFERENCES categories(id) NOT NULL,
      imageurl VARCHAR(255) NOT NULL,
      data JSON NOT NULL
    );`);

    await client.query(`
    CREATE TABLE purchases(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) NOT NULL,
      total DECIMAL NOT NULL,
      items JSON NOT NULL
    );`);

    console.log("Tables Created.\n");

  } catch (error) {
    console.error(error);
  };

};


async function seedUsers(client) {
  console.log("Seeding Users...");
  const users = [
    {
      firstname:"James",
      lastname:"Townsend",
      email:"email1@website.com",
      hash: await bcrypt.hash("12345678email1", 7)
    },  {
      firstname:"Parker",
      lastname:"Townsend",
      email:"email2@website.com",
      hash: await bcrypt.hash("12345678email2", 7)
    },  {
      firstname:"James",
      lastname:"Gibson",
      email:"email3@website.com",
      hash: await bcrypt.hash("12345678email3", 7)
    },  {
      firstname:"Jay",
      lastname:"Townsend",
      email:"email4@website.com",
      hash: await bcrypt.hash("12345678email4", 7)
    }
  ];
  try {
    for (const user of users) {
      await client.query(`INSERT INTO users (firstname, lastname, email, hash) VALUES ($1, $2, $3, $4)`, [user.firstname, user.lastname, user.email, user.hash])
    }
  console.log("Users seeded.\n")
  } catch (error) {
    (error)
  }
}

async function seedCategories(client) {

  console.log("Seeding Categories...");

  try {
    for (const category of categories) {
      await client.query(`INSERT INTO categories (name) VALUES ($1)`, [category.name]);
    }
    console.log("categories Seeded.\n");
  } catch (error) {
    console.error(error);
  };
  
};

async function seedInstruments(client) {
  console.log("Seeding Instruments...");

  try {

    for (const instrument of instruments) {
      await client.query(
        `INSERT INTO instruments (name, price, stock, category_id, imageurl, data) VALUES ($1, $2, $3, $4, $5, $6)`,
        [instrument.name, instrument.price, instrument.stock, instrument.category_id, instrument.imageURL, instrument.data]
      );
    };

    console.log("Instruments seeded.\n");

  } catch (error) {
    console.error(error);
  };
};

async function buildDb() {
  try {
    client.connect();
    await seedTables(client);
    await seedCategories(client);
    await seedInstruments(client);
    await seedUsers(client);
    
  } catch (error) {
    console.error(error);
  };
};

buildDb().catch(console.error).finally(() => client.end());