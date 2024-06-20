const client = require("./index");

async function addTotal(user_id, purchasedate, _total) {

  const SQL = `
  INSERT INTO totals (user_id, purchasedate, total)
  VALUES ($1, $2, $3)
  RETURNING id, total;
  `
  try {
    const { rows } = await client.query(SQL, [user_id, purchasedate, _total])
    return rows[0]

  } catch (error) {
    console.error(error);
  }

}

async function getTotalById(id) {

  const SQL = `
  SELECT id, total
  FROM totals
  WHERE id = ($1)
  `
  try {
    const { rows } = await client.query(SQL, [id]);
    return rows[0];

  } catch (error) {
    console.error(error);
  }
}

module.exports = { addTotal, getTotalById }