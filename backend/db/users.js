const bcrypt = require('bcrypt');
const client = require('./index');
const { JsonWebTokenError } = require('jsonwebtoken');

async function createUser(userObject) {
  const SALT_ROUNDS = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(userObject.password, SALT_ROUNDS);
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
    if (!passwordsMatch) return;
    delete user.hash;
    return user;

  } catch (error) {
    console.error(error);
  };

};

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

async function updateUserInfo(id, userObject) {

  try {
    const { firstname, lastname, email } = userObject
    const { rows: [user] } = await client.query(`
      UPDATE users
      SET "firstname"=($1), "lastname"=($2), "email"=($3)
      WHERE id=($4)
      RETURNING id, firstname, lastname, email;
    `, [firstname, lastname, email, id]);

    return user;

  } catch (error) {
    console.error(error);

  };
};

async function updatePassword(id, newPassword) {
  const SALT_ROUNDS = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)
  try {
    const { rows: [user] } = await client.query(`
      UPDATE users
      SET "hash"=($1)
      WHERE id=($2)
      RETURNING id, firstname, lastname, email;
      `, [hashedPassword, id])
    return user;
    
  } catch (error) {
    console.error(error);
  }
}

module.exports = { createUser, getUserByEmail, getUser, getUserById, updateUserInfo, updatePassword };