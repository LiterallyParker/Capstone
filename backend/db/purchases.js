const { instruments } = require("../data");
const { addPrice } = require("../util/math");
const client = require("./index");
const { getInstrumentById } = require("./instruments");
const { getTotalByPurchasedate, addTotal, getTotalById } = require("./totals");

async function getPurchaseById(id) {

  const SQL = `
  SELECT id, user_id, instrument_id, quantity, purchasedate FROM purchases
  WHERE id = ($1);
  `

  try {

    const { rows: [purchase] } = await client.query(SQL, [id]);
    return purchase

  } catch (error) {

    console.error(error)

  }

}

async function getPurchasesByUserId(user_id) {
  try {
    
    const SQL = `
    SELECT id, instrument_id, quantity, total_id, purchasedate
    FROM purchases
    WHERE user_id = ($1);
    `
    
    const { rows } = await client.query(SQL, [user_id]);

    if (!rows.length) {
      return;
    }

    const usedTimestamps = {}
    for (const item of rows) {
      
      const { instrument_id, purchasedate } = item

      const instrument = await getInstrumentById(instrument_id)

      item.total = parseFloat(instrument.price) * item.quantity

      if (usedTimestamps[purchasedate] === undefined) {
        usedTimestamps[purchasedate] = true;

      }
      
    }

    const result = []
    const times = Object.keys(usedTimestamps);

    for (const purchasedate of times) {

      let items = rows.filter((purchase) => {
          const dbDate = purchase.purchasedate
          const purchaseTimestamp = new Date(dbDate).toString();
          if (purchasedate === purchaseTimestamp) {
          return purchase
        };

      });
      async function attachInfo(purchase) {
        const instrument = await getInstrumentById(purchase.instrument_id);
        purchase.name = await instrument.name
        purchase.price = await instrument.price
        return instrument.price
      }

      items = items.map((purchase) => {
        attachInfo(purchase)
        delete purchase.instrument_id
        return purchase
      })

      const { id, total } = await getTotalById(items[0].total_id)

      let returnObject = {
        purchasedate,
        id,
        total:parseFloat(total),
        items
      }

      result.push(returnObject);

    };

    return result;


  } catch (error) {
    console.error(error)
  }
}

async function addPurchase(user_id, cart_items) {
  const purchasedate = new Date()

  try {

    const items = []
    for (const item of cart_items) {

      const { id, quantity } = item

      const instrument = await getInstrumentById(id);
      instrument.quantity = quantity
      const itemTotal = await instrument.price * quantity;
      instrument.total = itemTotal;
      items.push(instrument);

    }
    
    const total = items.reduce((res, item) => addPrice(res, item.total), 0)

    const addedTotal = await addTotal(user_id, purchasedate, total)

    for (let item of cart_items) {
        const { rows } = await client.query(`
        INSERT INTO purchases(user_id, instrument_id, total_id, quantity, purchasedate)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`, [user_id, item.id, addedTotal.id, item.quantity, purchasedate])
    }

    return { purchasedate, total:addedTotal.total, id:addedTotal.id, items }

  } catch (error) {
    console.error(error)
  }
}

module.exports = { addPurchase, getPurchaseById, getPurchasesByUserId }

// {
//   "purchasedate": "Thu Jun 20 2024 03:47:42 GMT-0600 (Central Standard Time)",
//   "total": 3135.46,
//   "items": [
//       {
//           "id": 1,
//           "instrument_id": 5,
//           "quantity": 3,
//           "total_id": 1,
//           "instrument": {
//               "id": 5,
//               "name": "Congas",
//               "price": "750.50",
//               "stock": 25,
//               "category": "Percussion",
//               "imageurl": "https://m.media-amazon.com/images/I/71RiozAr4-L.jpg",
//               "data": {
//                   "Brand": "Latin Percussion",
//                   "Color": "Natural",
//                   "Height": "30 inches",
//                   "Material": "Wood"
//               }
//           },
//           "total": 2251.5
//       },
//       {
//           "id": 2,
//           "instrument_id": 10,
//           "quantity": 4,
//           "total_id": 1,
//           "instrument": {
//               "id": 10,
//               "name": "Audio Interface",
//               "price": "220.99",
//               "stock": 30,
//               "category": "Woodwinds",
//               "imageurl": "https://cdn11.bigcommerce.com/s-7exlzlf13h/images/stencil/500x659/products/307/785/scarlett-2i2-top-image-2400-2400__78159.1693324453.png?c=3",
//               "data": {
//                   "Brand": "Behringer",
//                   "Color": "Red",
//                   "Outputs": 2
//               }
//           },
//           "total": 883.96
//       }
//   ]
// }

// {
//   "purchasedate": "2024-06-20T09:47:42.300Z",
//   "total": 3135.46,
//   "items": [
//       {
//           "id": 5,
//           "name": "Congas",
//           "price": "750.50",
//           "stock": 25,
//           "category": "Percussion",
//           "imageurl": "https://m.media-amazon.com/images/I/71RiozAr4-L.jpg",
//           "data": {
//               "Brand": "Latin Percussion",
//               "Color": "Natural",
//               "Height": "30 inches",
//               "Material": "Wood"
//           },
//           "quantity": 3,
//           "total": 2251.5
//       },
//       {
//           "id": 10,
//           "name": "Audio Interface",
//           "price": "220.99",
//           "stock": 30,
//           "category": "Woodwinds",
//           "imageurl": "https://cdn11.bigcommerce.com/s-7exlzlf13h/images/stencil/500x659/products/307/785/scarlett-2i2-top-image-2400-2400__78159.1693324453.png?c=3",
//           "data": {
//               "Brand": "Behringer",
//               "Color": "Red",
//               "Outputs": 2
//           },
//           "quantity": 4,
//           "total": 883.96
//       }
//   ]
// }