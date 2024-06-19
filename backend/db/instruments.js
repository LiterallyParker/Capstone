const client = require('./index');

async function getInstrumentRows() {
  try {

    const SQL = `SELECT instruments.id as id, instruments.name as name, instruments.price as price, instruments.stock as stock, categories.name as category, instruments.imageurl as imageURL, instruments.data as data FROM instruments
    JOIN categories on categories.id = instruments.category_id`;
    const { rows } = await client.query(SQL);
    return rows;

  } catch (error) {

    console.error(error);

  }
}

async function getInstrumentById(id) {

  try {

    const SQL = `
    SELECT instruments.id as id, instruments.name as name, instruments.price as price, instruments.stock as stock, categories.name as category, instruments.imageurl as imageurl, instruments.data as data FROM instruments
    JOIN categories on categories.id = instruments.category_id
    WHERE instruments.id = $1`;
    const { rows } = await client.query(SQL, [id]);
    return rows;

  } catch (error) {

    console.error(error);

  }

}

module.exports = { getInstrumentRows, getInstrumentById };