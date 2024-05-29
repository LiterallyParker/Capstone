const bcrypt = require("bcrypt")

const instruments = [
  {
    "name": "Grand Piano",
    "price": 6480.00,
    "stock": 21,
    "catagory_id": 2,
    "data": {
      "brand": "Steinway",
      "color": "Carbon Black",
      "keys": 88
    }
  },
  {
    "name": "Audio Interface",
    "price": 220.99,
    "stock": 30,
    "catagory_id": 7,
    "data": {
      "brand": "Fender",
      "color": "Cherry Red",
      "strings": 6
    }
  },
  {
    "name": "Violin",
    "price": 1350.50,
    "stock": 12,
    "catagory_id": 1,
    "data": {
      "brand": "Cremona",
      "wood": "Maple"
    }
  },
  {
    "name": "Cowbell",
    "price": 45.70,
    "stock": 14,
    "catagory_id": 5,
    "data": {
      "brand": "Yamaha",
      "color": "Gold",
      "Note": "A"
    }
  },
  {
    "name": "Oscilator",
    "price": 130.00,
    "stock": 110,
    "catagory_id": 6,
    "data": {
      "brand": "Behringer",
      "color": "White",
      "outputs": 2
    }
  },
  {
    "name": "Acoustic Guitar",
    "price": 1575.00,
    "stock": 65,
    "catagory_id": 3,
    "data": {
      "brand": "Hartwood",
      "color": "Burgundy",
      "strings": 6
    }
  },
  {
    "name": "Drum Set",
    "price": 4380.90,
    "stock": 12,
    "catagory_id": 4,
    "data": {
      "style": "Standard"
    }
  },
  {
    "name": "Electric Guitar",
    "price": 423.00,
    "stock": 50,
    "catagory_id": 3,
    "data": {
      "brand": "Yamaha",
      "color": "Olive Green",
      "strings": 6
    }
  },
];
const catagories = [
  {
    "name": "Strings",
    "data": {
      "instruments": instruments.filter((inst) => inst.catagory_id == 1)
    }
  },
  {
    "name": "Piano/Keys",
    "data": {
      "instruments": instruments.filter((inst) => inst.catagory_id == 2)
    }
  },
  {
    "name": "Guitar/Bass",
    "data": {
      "instruments": instruments.filter((inst) => inst.catagory_id == 3)
    }
  },
  {
    "name": "Drum Kits",
    "data": {
      "instruments": instruments.filter((inst) => inst.catagory_id == 4)
    }
  },
  {
    "name": "Percussion",
    "data": {
      "instruments": instruments.filter((inst) => inst.catagory_id == 5)
    }
  },
  {
    "name": "Modular/Synth",
    "data": {
      "instruments": instruments.filter((inst) => inst.catagory_id == 6)
    }
  },
  {
    "name": "Etc.",
    "data": {
      "instruments": instruments.filter((inst) => inst.catagory_id == 7)
    }
  }
];
module.exports = { instruments, catagories };