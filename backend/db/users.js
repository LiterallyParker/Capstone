const client = require('./index.js');
const bcrypt = require('bcrypt')

async function createUser(userObject) {
  const password = await bcrypt.hash(userObject.password, 7);
  const SQL = `
  INSERT INTO users (first_name, last_name, email, hash) VALUES ($1, $2, $3, $4) returning id`;
  try {
    const { rows } = await client.query(SQL, [userObject.first_name, userObject.last_name, userObject.email, password]);
    return {
      ...userObject,
      id: rows.id
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = { createUser }