const bcrypt = require("bcrypt")

const instruments = [
  {
      "name": "Electric Guitar",
      "price": "1250.99",
      "stock": 15,
      "catagory_id": 3,
      "imageURL":"https://sc1.musik-produktiv.com/pic-010154656l/fender-vintera-ii-50-s-strat-2-ts.jpg",
      "data": {
          "brand": "Fender",
          "color": "Sunburst",
          "strings": 6,
          "pickup": "Single Coil"
      }
  },
  {
      "name": "Jazz Kit",
      "price": "3200.75",
      "stock": 8,
      "catagory_id": 4,
      "imageURL":"https://www.drumazon.com/cdn/shop/files/YAMAHA-9000-RECORDING-CUSTOM-5-PIECE-DRUM-KIT-CHERRY-WOOD-DRUMAZON_01_1000x.jpg?v=1682595316",
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
      "imageURL":"https://i.ebayimg.com/images/g/V-8AAOSwGQFlOgct/s-l1200.jpg",
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
      "imageURL":"https://media.musicarts.com/is/image/MMGS7/L79386000001000-02-720x720.jpg",
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
      "imageURL":"https://media.sweetwater.com/m/products/image/ba2624f7a6GVRYdd7gRJgp7kw1no8nhsRAegp7lI.png?quality=82&height=750&ha=ba2624f7a6d8ad40",
      "data": {
          "brand": "Ibanez",
          "color": "Black",
          "strings": 5,
          "pickup": "Humbucker"
      }
  },
  {
      "name": "Congas",
      "price": "750.50",
      "stock": 25,
      "catagory_id": 5,
      "imageURL":"https://m.media-amazon.com/images/I/71RiozAr4-L.jpg",
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
      "imageURL":"https://www.electricviolinshop.com/media/catalog/product/cache/06d8bd51b89dcb6b010cb9f1eb240c4c/s/v/sv-200pearlwhite_front.png",
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
      "imageURL":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6350/6350485_sd.jpg",
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
      "imageURL":"https://ajhsynth.com/images/MiniMod/VCO_Black_Side_small.jpg",
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
      "imageURL":"https://cameronpiano.com/wp-content/uploads/2015/11/Stein_0_Google.jpg",
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
      "imageURL":"https://cdn11.bigcommerce.com/s-7exlzlf13h/images/stencil/500x659/products/307/785/scarlett-2i2-top-image-2400-2400__78159.1693324453.png?c=3",
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
      "imageURL":"https://media.musicarts.com/is/image/MMGS7/J00687000001000-00-720x720.jpg",
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
      "imageURL":"https://s3.amazonaws.com/images.static.steveweissmusic.com/products/images/uploads/popup/PEA-HH5.jpg",
      "data": {
      "brand": "Pearl",
      "color": "Bronze",
      "Note": "A"
    }
  },
  {
    "name": "Oscilator",
    "price": 130.00,
    "stock": 110,
    "catagory_id": 6,
      "imageURL":"https://m.media-amazon.com/images/I/41O2SI3FqhL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_PIStarRatingFIVE%2CBottomLeft%2C360%2C-6_SR600%2C315_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.jpg",
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
      "imageURL":"https://d1aeri3ty3izns.cloudfront.net/media/104/1045409/600/preview.jpg",
      "data": {
      "brand": "Hartwood",
      "color": "Natural Koa",
      "strings": 6
    }
  },
  {
    "name": "Drum Set",
    "price": 4380.90,
    "stock": 12,
    "catagory_id": 4,
      "imageURL":"https://kalabrand.com/cdn/shop/products/KA-GTR-NY25_21_R.jpg?v=1610556204",
      "data": {
      "style": "Standard",
      "peices":5,
      "color":"Dark Brown"
    }
  },
  {
    "name": "Electric Guitar",
    "price": 423.00,
    "stock": 50,
    "catagory_id": 3,
      "imageURL":"https://cdn.shopify.com/s/files/1/0202/0250/products/RSS20_flashgreen_a_0001_8c03e781e7a377cefdd2fd6b20551d01-fc.jpg",
      "data": {
      "brand": "Yamaha",
      "color": "Flash Green",
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