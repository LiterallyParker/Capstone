function convertPrice(float) {
  return parseFloat(float).toFixed(2);
}

const addPrice = (res, num) => {
  return parseFloat(res) + parseFloat(num)
}

module.exports = { convertPrice, addPrice }