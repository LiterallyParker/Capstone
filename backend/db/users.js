const bcrypt = require('bcrypt');
const client = require('./index');
require("dotenv").config()

async function createUser(userObject) {

  const password = await bcrypt.hash(userObject.password, 7);
  const SQL = `
  INSERT INTO users (firstname, lastname, email, hash) VALUES ($1, $2, $3, $4) returning id
  `;

  try {

    const { rows } = await client.query(SQL, [userObject.firstname, userObject.lastname, userObject.email, password]);
    return {
      ...userObject,
      id: rows[0].id
    };

  } catch (error) {
    console.error(error);
  };

};

async function getUserByEmail(email) {

  const SQL = `SELECT id, firstname, lastname, email, hash FROM users WHERE email = $1;`;

  try {

    const { rows } = await client.query(SQL, [email]);
    if (!rows || !rows.length) return null;
    const [user] = rows
    return user;

  } catch (error) {
    console.error(error);
  }

}

async function getUser({ email, password }) {
  if (!email || !password) {
    return;
  }

  try {

    const user = await getUserByEmail(email);
    if (!user) return;
    const hashedPassword = user.hash;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if(!passwordsMatch) return;
    delete user.hash;
    return user;

  } catch (error) {
    console.error(error);
  }

}

async function getUserById(id) {

  const SQL = "SELECT id, firstname, lastname, email FROM users WHERE id = ($1);";

  try {
    const { rows: [user] } = await client.query(SQL, [id]);
    if (!user) return;
    return user;

  } catch (error) {
    console.error(error);

  };

};

module.exports = { createUser, getUserByEmail, getUser, getUserById };