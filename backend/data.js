const bcrypt = require("bcrypt")

const instruments = [
  {
      "name": "Electric Guitar",
      "price": "1250.99",
      "stock": 15,
      "catagory_id": 3,
      "imageURL":"https://sc1.musik-produktiv.com/pic-010154656l/fender-vintera-ii-50-s-strat-2-ts.jpg",
      "data": {
          "Brand": "Fender",
          "Color": "Sunburst",
          "Strings": 6,
          "Pickup": "Single Coil"
      }
  },
  {
      "name": "Jazz Kit",
      "price": "3200.75",
      "stock": 8,
      "catagory_id": 4,
      "imageURL":"https://www.drumazon.com/cdn/shop/files/YAMAHA-9000-RECORDING-CUSTOM-5-PIECE-DRUM-KIT-CHERRY-WOOD-DRUMAZON_01_1000x.jpg?v=1682595316",
      "data": {
          "Brand": "Yamaha",
          "Color": "Cherry Red",
          "Pieces": 5,
          "Cymbals": "Zildjian"
      }
  },
  {
      "name": "Digital Synthesizer",
      "price": "2500.49",
      "stock": 10,
      "catagory_id": 6,
      "imageURL":"https://i.ebayimg.com/images/g/V-8AAOSwGQFlOgct/s-l1200.jpg",
      "data": {
          "Brand": "Korg",
          "Color": "Silver",
          "Keys": 61,
          "Polyphony": "8-voice"
      }
  },
  {
      "name": "Acoustic Guitar",
      "price": "980.00",
      "stock": 18,
      "catagory_id": 3,
      "imageURL":"https://media.musicarts.com/is/image/MMGS7/L79386000001000-02-720x720.jpg",
      "data": {
          "Brand": "Martin",
          "Color": "Natural",
          "Strings": 6,
          "Body Type": "Dreadnought"
      }
  },
  {
      "name": "Electric Bass",
      "price": "1120.75",
      "stock": 12,
      "catagory_id": 3,
      "imageURL":"https://media.sweetwater.com/m/products/image/ba2624f7a6GVRYdd7gRJgp7kw1no8nhsRAegp7lI.png?quality=82&height=750&ha=ba2624f7a6d8ad40",
      "data": {
          "Brand": "Ibanez",
          "Color": "Black",
          "Strings": 5,
          "Pickup": "Humbucker"
      }
  },
  {
      "name": "Congas",
      "price": "750.50",
      "stock": 25,
      "catagory_id": 5,
      "imageURL":"https://m.media-amazon.com/images/I/71RiozAr4-L.jpg",
      "data": {
          "Brand": "Latin Percussion",
          "Color": "Natural",
          "Height": "30 inches",
          "Material": "Wood"
      }
  },
  {
      "name": "Electric Violin",
      "price": "1390.25",
      "stock": 9,
      "catagory_id": 7,
      "imageURL":"https://www.electricviolinshop.com/media/catalog/product/cache/06d8bd51b89dcb6b010cb9f1eb240c4c/s/v/sv-200pearlwhite_front.png",
      "data": {
          "Brand": "Yamaha",
          "Color": "White",
          "Strings": 4,
          "Pickup": "Piezoelectric"
      }
  },
  {
      "name": "Digital Piano",
      "price": "2100.99",
      "stock": 16,
      "catagory_id": 2,
      "imageURL":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6350/6350485_sd.jpg",
      "data": {
          "Brand": "Roland",
          "Color": "Black",
          "Keys": 88,
      }
  },
  {
      "name": "Oscillator",
      "price": "450.45",
      "stock": 30,
      "catagory_id": 6,
      "imageURL":"https://ajhsynth.com/images/MiniMod/VCO_Black_Side_small.jpg",
      "data": {
          "Brand": "Moog",
          "Color": "Black",
          "Control Voltage": "1V/oct"
      }
  },
  {
    "name": "Grand Piano",
    "price": 6480.00,
    "stock": 21,
    "catagory_id": 2,
    "imageURL":"https://cameronpiano.com/wp-content/uploads/2015/11/Stein_0_Google.jpg",
    "data": {
      "Brand": "Steinway",
      "Color": "Carbon Black",
      "Keys": 88
    }
  },
  {
    "name": "Audio Interface",
    "price": 220.99,
    "stock": 30,
    "catagory_id": 7,
    "imageURL":"https://cdn11.bigcommerce.com/s-7exlzlf13h/images/stencil/500x659/products/307/785/scarlett-2i2-top-image-2400-2400__78159.1693324453.png?c=3",
    "data": {
      "Brand": "Behringer",
      "Color": "Red",
      "Outputs": 2
    }
  },
  {
    "name": "Violin",
    "price": 1350.50,
    "stock": 12,
    "catagory_id": 1,
    "imageURL":"https://media.musicarts.com/is/image/MMGS7/J00687000001000-00-720x720.jpg",
    "data": {
      "Brand": "Cremona",
      "Wood": "Maple"
    }
  },
  {
    "name": "Cowbell",
    "price": 45.70,
    "stock": 14,
    "catagory_id": 5,
    "imageURL":"https://s3.amazonaws.com/images.static.steveweissmusic.com/products/images/uploads/popup/PEA-HH5.jpg",
    "data": {
      "Brand":"Pearl",
      "Color":"Bronze",
      "Note":"A"
    }
  },
  {
    "name": "Oscilator",
    "price": 130.00,
    "stock": 110,
    "catagory_id": 6,
    "imageURL":"https://m.media-amazon.com/images/I/41O2SI3FqhL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_PIStarRatingFIVE%2CBottomLeft%2C360%2C-6_SR600%2C315_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.jpg",
    "data": {
      "Brand": "Behringer",
      "Color": "White",
      "Outputs": 2
    }
  },
  {
    "name": "Acoustic Guitar",
    "price": 1575.00,
    "stock": 65,
    "catagory_id": 3,
    "imageURL":"https://d1aeri3ty3izns.cloudfront.net/media/104/1045409/600/preview.jpg",
    "data": {
      "Brand": "Hartwood",
      "Color": "Natural Koa",
      "Strings": 6
    }
  },
  {
    "name": "Drum Set",
    "price": 4380.90,
    "stock": 12,
    "catagory_id": 4,
    "imageURL":"https://kalabrand.com/cdn/shop/products/KA-GTR-NY25_21_R.jpg?v=1610556204",
    "data": {
      "Style": "Standard",
      "Pieces":5,
      "Color":"Dark Brown"
    }
  },
  {
    "name": "Electric Guitar",
    "price": 423.00,
    "stock": 50,
    "catagory_id": 3,
    "imageURL":"https://cdn.shopify.com/s/files/1/0202/0250/products/RSS20_flashgreen_a_0001_8c03e781e7a377cefdd2fd6b20551d01-fc.jpg",
    "data": {
      "Brand": "Yamaha",
      "Color": "Flash Green",
      "Strings": 6
    }
  },
  {
    "name": "Saxophone",
    "price": 1899.99,
    "stock": 7,
    "catagory_id": 7,
    "imageURL": "https://www.yamaha.com/ussub/img/2020/products/YAS-26II/contents/visual/front.jpg",
    "data": {
      "Brand": "Yamaha",
      "Type": "Alto",
      "Material": "Brass",
      "Color": "Gold Lacquer"
    }
  },
  {
    "name": "Trumpet",
    "price": 1299.50,
    "stock": 10,
    "catagory_id": 8,
    "imageURL": "https://www.yamaha.com/ussub/img/2020/products/YTR-2330/contents/visual/right.jpg",
    "data": {
      "Brand": "Yamaha",
      "Material": "Brass",
      "Color": "Silver Plated"
    }
  },
  {
    "name": "Flute",
    "price": 699.00,
    "stock": 15,
    "catagory_id": 7,
    "imageURL": "https://www.yamaha.com/ussub/img/2020/products/YFL-222/contents/visual/front.jpg",
    "data": {
      "Brand": "Yamaha",
      "Material": "Nickel Silver",
      "Color": "Silver"
    }
  },
  {
    "name": "Trombone",
    "price": 1495.25,
    "stock": 5,
    "catagory_id": 8,
    "imageURL": "https://www.yamaha.com/ussub/img/2020/products/YSL-448G/contents/visual/right.jpg",
    "data": {
      "Brand": "Yamaha",
      "Material": "Brass",
      "Color": "Gold Lacquer"
    }
  },
  {
    "name": "Clarinet",
    "price": 1099.00,
    "stock": 8,
    "catagory_id": 7,
    "imageURL": "https://www.yamaha.com/ussub/img/2020/products/YCL-255/contents/visual/right.jpg",
    "data": {
      "Brand": "Yamaha",
      "Material": "ABS Resin",
      "Color": "Black"
    }
  },
  {
    "name": "Harp",
    "price": 4500.00,
    "stock": 3,
    "catagory_id": 1,
    "imageURL": "https://www.salviharps.com/wp-content/uploads/2019/06/Minerva-natural-1.jpg",
    "data": {
      "Brand": "Salvi",
      "Material": "Wood",
      "Color": "Natural"
    }
  },
  {
    "name": "Bagpipes",
    "price": 1200.00,
    "stock": 2,
    "catagory_id": 7,
    "imageURL": "https://www.sandarac.co.uk/images/bagpipes.jpg",
    "data": {
      "Brand": "McCallum Bagpipes",
      "Material": "African Blackwood",
      "Color": "Black"
    }
  },
  {
    "name": "Harmonica",
    "price": 49.99,
    "stock": 20,
    "catagory_id": 7,
    "imageURL": "https://www.hohner.de/fileadmin/_processed_/4/6/csm_590-20-0_290c25a365.jpg",
    "data": {
      "Brand": "Hohner",
      "Material": "Plastic",
      "Color": "Black"
    }
  },
  {
    "name": "Accordion",
    "price": 1699.00,
    "stock": 6,
    "catagory_id": 2,
    "imageURL": "https://images-na.ssl-images-amazon.com/images/I/71WXa4tE5aL._AC_SX466_.jpg",
    "data": {
      "Brand": "Hohner",
      "Color": "Black",
      "Keys": 41
    }
  },
  {
    "name": "Xylophone",
    "price": 299.99,
    "stock": 10,
    "catagory_id": 5,
    "imageURL": "https://cdn.shopify.com/s/files/1/0444/7463/9437/products/gd-x8_720x.jpg?v=1606119207",
    "data": {
      "Brand": "Grover Pro",
      "Material": "Rosewood",
      "Color": "Brown"
    }
  },
  {
    "name": "Mandolin",
    "price": "675.00",
    "stock": 20,
    "catagory_id": 1,
    "imageURL": "",
    "data": {
      "Brand": "Gibson",
      "Color": "Sunburst",
      "Strings": 8,
      "Body Type": "A-Style"
    }
  },
  {
    "name": "Digital Drum Pad",
    "price": "320.99",
    "stock": 25,
    "catagory_id": 4,
    "imageURL": "",
    "data": {
      "Brand": "Alesis",
      "Color": "Black",
      "Pads": 8,
      "Connectivity": "USB/MIDI"
    }
  },
  {
    "name": "Bongos",
    "price": "199.50",
    "stock": 30,
    "catagory_id": 5,
    "imageURL": "",
    "data": {
      "Brand": "Meinl",
      "Color": "Natural",
      "Material": "Wood",
      "Diameter": "6.5 and 7.5 inches"
    }
  },
  {
    "name": "MIDI Controller",
    "price": "450.75",
    "stock": 40,
    "catagory_id": 6,
    "imageURL": "",
    "data": {
      "Brand": "Akai",
      "Color": "Black",
      "Keys": 49,
      "Pads": 16
    }
  },
  {
    "name": "Oboe",
    "price": "1899.99",
    "stock": 5,
    "catagory_id": 7,
    "imageURL": "",
    "data": {
      "Brand": "Buffet",
      "Material": "Grenadilla Wood",
      "Color": "Black",
      "Keys": "Silver-plated"
    }
  },
  {
    "name": "French Horn",
    "price": "2590.75",
    "stock": 7,
    "catagory_id": 8,
    "imageURL": "",
    "data": {
      "Brand": "Conn",
      "Material": "Brass",
      "Color": "Gold Lacquer",
      "Type": "Double"
    }
  },
  {
    "name": "Sitar",
    "price": "1120.50",
    "stock": 10,
    "catagory_id": 1,
    "imageURL": "",
    "data": {
      "Brand": "Rikhi Ram",
      "Color": "Natural",
      "Strings": 18,
      "Material": "Teak Wood"
    }
  },
  {
    "name": "Portable Keyboard",
    "price": "550.00",
    "stock": 15,
    "catagory_id": 2,
    "imageURL": "",
    "data": {
      "Brand": "Casio",
      "Color": "Black",
      "Keys": 61,
      "Polyphony": "48-voice"
    }
  },
  {
    "name": "Steel Drum",
    "price": "850.99",
    "stock": 8,
    "catagory_id": 5,
    "imageURL": "",
    "data": {
      "Brand": "Panyard",
      "Color": "Silver",
      "Material": "Steel",
      "Diameter": "23 inches"
    }
  },
  {
    "name": "Theremin",
    "price": "995.00",
    "stock": 12,
    "catagory_id": 9,
    "imageURL": "https://media.sweetwater.com/m/products/image/a1b57c881dyF8vJBAjE1dHhLVBKXmDFKyZY11Fzs.png?quality=82&ha=a1b57c881d400fa5",
    "data": {
      "Brand": "Moog",
      "Color": "Black",
      "Control Voltage": "CV Out",
      "Connectivity": "USB"
    }
  }
];
const catagories = [
  {
    "name": "Strings",
  },
  {
    "name": "Piano/Keys",
  },
  {
    "name": "Guitar/Bass",
  },
  {
    "name": "Drum Kits",
  },
  {
    "name": "Percussion",
  },
  {
    "name": "Modular/Synth",
  },
  {
    "name": "Woodwinds",
  },
  {
    "name": "Brass",
  },
  {
    "name": "Etc.",
  }
];
module.exports = { instruments, catagories };