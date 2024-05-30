const client = require('./index');
const bcrypt = require('bcrypt')

async function createUser(userObject) {

  const password = await bcrypt.hash(userObject.password, 7);
  const SQL = `
  INSERT INTO users (first_name, last_name, email, hash, data) VALUES ($1, $2, $3, $4, $5) returning id`;

  try {

    const { rows } = await client.query(SQL, [userObject.first_name, userObject.last_name, userObject.email, password, {"wishlist":[],"cart":[]}]);
    return {
      ...userObject,
      id: rows[0].id
    }

  } catch (error) {
    console.error(error)
  }
}

async function getUserByEmail(email) {
  const SQL = `SELECT email from users WHERE email = $1;`;
  try {
    const { rows } = await client.query(SQL, [email]);
    return rows

  } catch (error) {
    console.error(error);
  }
}

module.exports = { createUser, getUserByEmail }