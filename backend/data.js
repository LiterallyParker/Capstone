const bcrypt = require("bcrypt")

const instruments = [
  {
      "name": "Electric Guitar",
      "price": "1250.99",
      "stock": 15,
      "catagory_id": 3,
      "data": {
          "brand": "Fender",
          "color": "Sunburst",
          "strings": 6,
          "pickup": "Single Coil"
      }
  },
  {
      "name": "Drum Kit",
      "price": "3200.75",
      "stock": 8,
      "catagory_id": 4,
      "data": {
          "brand": "Yamaha",
          "color": "Cherry Red",
          "pieces": 5,
          "cymbals": "Zildjian"
      }
  },
  {
      "name": "Digital Synthesizer",
      "price": "2500.49",
      "stock": 10,
      "catagory_id": 6,
      "data": {
          "brand": "Korg",
          "color": "Silver",
          "keys": 61,
          "polyphony": "8-voice"
      }
  },
  {
      "name": "Acoustic Guitar",
      "price": "980.00",
      "stock": 18,
      "catagory_id": 3,
      "data": {
          "brand": "Martin",
          "color": "Natural",
          "strings": 6,
          "bodyType": "Dreadnought"
      }
  },
  {
      "name": "Electric Bass",
      "price": "1120.75",
      "stock": 12,
      "catagory_id": 3,
      "data": {
          "brand": "Ibanez",
          "color": "Black",
          "strings": 4,
          "pickup": "Humbucker"
      }
  },
  {
      "name": "Congas",
      "price": "750.50",
      "stock": 25,
      "catagory_id": 5,
      "data": {
          "brand": "Latin Percussion",
          "color": "Natural",
          "height": "30 inches",
          "material": "Wood"
      }
  },
  {
      "name": "Electric Violin",
      "price": "1390.25",
      "stock": 9,
      "catagory_id": 7,
      "data": {
          "brand": "Yamaha",
          "color": "White",
          "strings": 4,
          "pickup": "Piezoelectric"
      }
  },
  {
      "name": "Digital Piano",
      "price": "2100.99",
      "stock": 16,
      "catagory_id": 2,
      "data": {
          "brand": "Roland",
          "color": "Black",
          "keys": 88,
          "features": ["Weighted Keys", "Bluetooth"]
      }
  },
  {
      "name": "Modular Synth Module",
      "price": "450.45",
      "stock": 30,
      "catagory_id": 6,
      "data": {
          "brand": "Moog",
          "color": "Black",
          "type": "Oscillator",
          "controlVoltage": "1V/oct"
      }
  },
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
      "brand": "Behringer",
      "color": "Red",
      "outputs": 2
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