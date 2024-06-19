const client = require("./index");

async function addPurchase(purchaseObject) {
  const { id, total, items } = purchaseObject
  try {
    const instertSQL = `

    INSERT INTO purchases (user_id, total, items)
    VALUES ($1, $2, $3);
    `
    const returnSQL = `
    SELECT purchases.id as id, users.email as email, purchases.total as total, purchases.items as items
    WHERE purchases.id = $(1)
    JOIN users ON purchases.user_id = users.id
    `

    const {rows} = await client.query(instertSQL, [id, total, items])
    console.log(rows)
    return rows

  } catch (error) {
    console.error(error)
  }
}

module.exports = { addPurchase }