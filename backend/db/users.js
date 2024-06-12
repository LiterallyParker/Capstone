const bcrypt = require('bcrypt');
const client = require('./index');

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
    console.error(error)
  };
};

async function getUserByEmail(email) {
  const SQL = `SELECT id, firstname, lastname, email, hash FROM users WHERE email = $1;`;
  try {
    const { rows } = await client.query(SQL, [email]);
    if (rows.length) {
      return rows[0];
    }
    return {error:true, message:"No user with that email."}

  } catch (error) {
    console.error(error);
  }
}

module.exports = { createUser, getUserByEmail };