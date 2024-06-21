const bcrypt = require("bcrypt")

const instruments = [
  {
    "name": "Electric Guitar",
    "price": 1250.99,
    "stock": 15,
    "category_id": 3,
    "imageURL": "https://sc1.musik-produktiv.com/pic-010154656l/fender-vintera-ii-50-s-strat-2-ts.jpg",
    "data": {
      "Brand": "Fender",
      "Color": "Sunburst",
      "Strings": 6,
      "Pickup": "Single Coil"
    }
  },
  {
    "name": "Jazz Kit",
    "price": 3200.75,
    "stock": 8,
    "category_id": 4,
    "imageURL": "https://www.drumazon.com/cdn/shop/files/YAMAHA-9000-RECORDING-CUSTOM-5-PIECE-DRUM-KIT-CHERRY-WOOD-DRUMAZON_01_1000x.jpg?v=1682595316",
    "data": {
      "Brand": "Yamaha",
      "Color": "Cherry Red",
      "Pieces": 5,
      "Cymbals": "Zildjian"
    }
  },
  {
    "name": "Acoustic Guitar",
    "price": 980.00,
    "stock": 18,
    "category_id": 3,
    "imageURL": "https://media.musicarts.com/is/image/MMGS7/L79386000001000-02-720x720.jpg",
    "data": {
      "Brand": "Martin",
      "Color": "Natural",
      "Strings": 6,
      "Body Type": "Dreadnought"
    }
  },
  {
    "name": "Electric Bass",
    "price": 1120.75,
    "stock": 12,
    "category_id": 3,
    "imageURL": "https://media.sweetwater.com/m/products/image/ba2624f7a6GVRYdd7gRJgp7kw1no8nhsRAegp7lI.png?quality=82&height=750&ha=ba2624f7a6d8ad40",
    "data": {
      "Brand": "Ibanez",
      "Color": "Black",
      "Strings": 5,
      "Pickup": "Humbucker"
    }
  },
  {
    "name": "Congas",
    "price": 750.50,
    "stock": 25,
    "category_id": 5,
    "imageURL": "https://m.media-amazon.com/images/I/71RiozAr4-L.jpg",
    "data": {
      "Brand": "Latin Percussion",
      "Color": "Natural",
      "Height": "30 inches",
      "Material": "Wood"
    }
  },
  {
    "name": "Electric Violin",
    "price": 1390.25,
    "stock": 9,
    "category_id": 1,
    "imageURL": "https://www.electricviolinshop.com/media/catalog/product/cache/06d8bd51b89dcb6b010cb9f1eb240c4c/s/v/sv-200pearlwhite_front.png",
    "data": {
      "Brand": "Yamaha",
      "Color": "White",
      "Strings": 4,
      "Pickup": "Piezoelectric"
    }
  },
  {
    "name": "Digital Piano",
    "price": 2100.99,
    "stock": 16,
    "category_id": 2,
    "imageURL": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6350/6350485_sd.jpg",
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
    "category_id": 6,
    "imageURL": "https://ajhsynth.com/images/MiniMod/VCO_Black_Side_small.jpg",
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
    "category_id": 2,
    "imageURL": "https://cameronpiano.com/wp-content/uploads/2015/11/Stein_0_Google.jpg",
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
    "category_id": 9,
    "imageURL": "https://cdn11.bigcommerce.com/s-7exlzlf13h/images/stencil/500x659/products/307/785/scarlett-2i2-top-image-2400-2400__78159.1693324453.png?c=3",
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
    "category_id": 1,
    "imageURL": "https://media.musicarts.com/is/image/MMGS7/J00687000001000-00-720x720.jpg",
    "data": {
      "Brand": "Cremona",
      "Wood": "Maple"
    }
  },
  {
    "name": "Cowbell",
    "price": 45.70,
    "stock": 14,
    "category_id": 5,
    "imageURL": "https://s3.amazonaws.com/images.static.steveweissmusic.com/products/images/uploads/popup/PEA-HH5.jpg",
    "data": {
      "Brand": "Pearl",
      "Color": "Bronze",
      "Note": "A"
    }
  },
  {
    "name": "Oscilator",
    "price": 130.00,
    "stock": 110,
    "category_id": 6,
    "imageURL": "https://m.media-amazon.com/images/I/41O2SI3FqhL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_PIStarRatingFIVE%2CBottomLeft%2C360%2C-6_SR600%2C315_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.jpg",
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
    "category_id": 3,
    "imageURL": "https://d1aeri3ty3izns.cloudfront.net/media/104/1045409/600/preview.jpg",
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
    "category_id": 4,
    "imageURL": "https://media.guitarcenter.com/is/image/MMGS7/J42120000002000-00-600x600.jpg",
    "data": {
      "Brank": "Tama",
      "Style": "Standard",
      "Pieces": 5,
      "Color": "Dark Brown"
    }
  },
  {
    "name": "Electric Guitar",
    "price": 423.00,
    "stock": 50,
    "category_id": 3,
    "imageURL": "https://cdn.shopify.com/s/files/1/0202/0250/products/RSS20_flashgreen_a_0001_8c03e781e7a377cefdd2fd6b20551d01-fc.jpg",
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
    "category_id": 7,
    "imageURL": "https://m.media-amazon.com/images/I/61NKX63KCBL.jpg",
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
    "category_id": 8,
    "imageURL": "https://www.andysmusic.com/cdn/shop/products/yamaha-ytr-4335gsii-silver-plated-bb-trumpet.jpg?v=1620417371",
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
    "category_id": 7,
    "imageURL": "https://i.ebayimg.com/images/g/kYgAAOSwagJl5kCG/s-l1600.jpg",
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
    "category_id": 8,
    "imageURL": "https://m.media-amazon.com/images/I/51m1UvUpA8L._AC_UF894,1000_QL80_.jpg",
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
    "category_id": 7,
    "imageURL": "https://m.media-amazon.com/images/I/413ebPdfzzS.jpg",
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
    "category_id": 1,
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
    "category_id": 7,
    "imageURL": "https://www.taylorscroft.com/cdn/shop/products/McCallum-AB0-Bagpipes.jpg?v=1476727818",
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
    "category_id": 7,
    "imageURL": "https://i.ebayimg.com/images/g/xjwAAOSw5~BiHHuj/s-l1200.webp",
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
    "category_id": 2,
    "imageURL": "https://media.rainpos.com/7832/used4761.jpg",
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
    "category_id": 5,
    "imageURL": "https://www.columbuspercussion.com/store/media/catalog/product/cache/1/image/1050x/040ec09b1e35df139433887a97daa66f/x/6/x6535h_1_hr.jpg",
    "data": {
      "Brand": "Grover Pro",
      "Material": "Rosewood",
      "Color": "Brown"
    }
  },
  {
    "name": "Mandolin",
    "price": 675.00,
    "stock": 20,
    "category_id": 1,
    "imageURL": "https://i.ebayimg.com/images/g/kSIAAOSwbFxkewFq/s-l1200.jpg",
    "data": {
      "Brand": "Vangoa",
      "Color": "Sunburst",
      "Strings": 8,
      "Body Type": "A-Style"
    }
  },
  {
    "name": "Digital Drum Pad",
    "price": 320.99,
    "stock": 25,
    "category_id": 4,
    "imageURL": "https://www.fullcompass.com/common/products/original/226475.jpg",
    "data": {
      "Brand": "Alesis",
      "Color": "Black",
      "Pads": 8,
      "Connectivity": "USB/MIDI"
    }
  },
  {
    "name": "Bongos",
    "price": 199.50,
    "stock": 30,
    "category_id": 5,
    "imageURL": "https://m.media-amazon.com/images/I/81N0SEDb+iL._AC_SX425_.jpg",
    "data": {
      "Brand": "Meinl",
      "Color": "Natural",
      "Material": "Wood",
      "Diameter": "6.5 and 7.5 inches"
    }
  },
  {
    "name": "MIDI Controller",
    "price": 450.75,
    "stock": 40,
    "category_id": 2,
    "imageURL": "https://media.musicarts.com/is/image/MMGS7/MPK249-49-Key-Controller-Black-on-Black/L84264000000000-00-1600x1600.jpg",
    "data": {
      "Brand": "Akai",
      "Color": "Black",
      "Keys": 49,
      "Pads": 16
    }
  },
  {
    "name": "Oboe",
    "price": 1899.99,
    "stock": 5,
    "category_id": 7,
    "imageURL": "https://www.mmimports.com/wp-content/uploads/2017/09/P1140546-2.jpg",
    "data": {
      "Brand": "Buffet",
      "Material": "Grenadilla Wood",
      "Color": "Black",
      "Keys": "Silver-plated"
    }
  },
  {
    "name": "French Horn",
    "price": 2590.75,
    "stock": 7,
    "category_id": 8,
    "imageURL": "https://media.sweetwater.com/m/products/image/867ab4ddd608dIFCeBLRBoalqxJhzkrAZJOiboIv.jpg?quality=82&width=750&ha=867ab4ddd68e9c19",
    "data": {
      "Brand": "Conn",
      "Material": "Brass",
      "Color": "Gold Lacquer",
      "Type": "Double"
    }
  },
  {
    "name": "Sitar",
    "price": 1120.50,
    "stock": 10,
    "category_id": 1,
    "imageURL": "https://cdn10.bigcommerce.com/s-ta610c/products/417/images/2548/Sitar_RRAjay_Teak_RS__96331.1561063974.1280.1280.jpg?c=2",
    "data": {
      "Brand": "Rikhi Ram",
      "Color": "Natural",
      "Strings": 18,
      "Material": "Teak Wood"
    }
  },
  {
    "name": "Portable Keyboard",
    "price": 264.50,
    "stock": 15,
    "category_id": 2,
    "imageURL": "https://m.media-amazon.com/images/I/61McOoFIZQL.jpg",
    "data": {
      "Brand": "Casio",
      "Color": "Black",
      "Keys": 61,
      "Polyphony": "48-voice"
    }
  },
  {
    "name": "Steel Drum",
    "price": 324.95,
    "stock": 8,
    "category_id": 5,
    "imageURL": "https://m.media-amazon.com/images/I/71kn7mW0HFL._AC_UF894,1000_QL80_.jpg",
    "data": {
      "Brand": "Panyard",
      "Color": "Silver",
      "Material": "Steel",
      "Diameter": "23 inches"
    }
  },
  {
    "name": "Theremin",
    "price": 995,
    "stock": 12,
    "category_id": 9,
    "imageURL": "https://media.sweetwater.com/m/products/image/a1b57c881dyF8vJBAjE1dHhLVBKXmDFKyZY11Fzs.png?quality=82&ha=a1b57c881d400fa5",
    "data": {
      "Brand": "Moog",
      "Color": "Black",
      "Control Voltage": "CV Out",
      "Connectivity": "USB"
    }
  },
  {
    "name": "Trumpet",
    "price": 1299.50,
    "stock": 10,
    "category_id": 8,
    "imageURL": "https://m.media-amazon.com/images/I/61YX02h9qlL._AC_UF894,1000_QL80_.jpg",
    "data": {
      "Brand": "Yamaha",
      "Material": "Brass",
      "Color": "Silver Plated"
    }
  },
  {
    "name": "Trombone",
    "price": 1495.25,
    "stock": 5,
    "category_id": 8,
    "imageURL": "https://www.andysmusic.com/cdn/shop/products/Yamaha-YSL-448G-Intermediate-Trigger-Trombone-Lacquer.jpg?v=1678328984",
    "data": {
      "Brand": "Yamaha",
      "Material": "Brass",
      "Color": "Gold Lacquer"
    }
  },
  {
    "name": "French Horn",
    "price": 2590.75,
    "stock": 7,
    "category_id": 8,
    "imageURL": "https://m.media-amazon.com/images/I/61Ibrh5fCnL.jpg",
    "data": {
      "Brand": "Conn",
      "Material": "Brass",
      "Color": "Silver",
      "Type": "Double"
    }
  }
];
const categories = [
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
    "name": "Modular",
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
module.exports = { instruments, categories };