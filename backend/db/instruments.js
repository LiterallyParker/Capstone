const client = require('./index');

async function getInstrumentRows() {
  try {

    const SQL = `SELECT id, name, price, stock, catagory_id as catagory, data FROM instruments;`;
    const { rows } = await client.query(SQL);
    return rows

  } catch (error) {

    console.error(error)

  }
}

async function getInstrumentById(id) {
  try {

    const SQL = `
    SELECT instruments.id as id, instruments.name as name, instruments.price as price, instruments.stock as stock, catagories.name as catagory, instruments.data as data FROM instruments
    JOIN catagories on catagories.id = instruments.catagory_id
    WHERE instruments.id = $1`;
    const { rows } = await client.query(SQL, [id]);
    return rows;

  } catch (error) {

    console.error(error)

  }
}

module.exports = { getInstrumentRows, getInstrumentById }