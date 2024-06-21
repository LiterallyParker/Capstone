const DevURL = "http://localhost:3000/api";
const ProductionURL = "https://capstone-4-vk50.onrender.com/api"
const MODE = "production"

let ENDPOINT = DevURL
if (MODE === "production") {
  ENDPOINT = ProductionURL
}


export default ENDPOINT