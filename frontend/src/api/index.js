const DevURL = "http://localhost:3000/api";
const ProductionURL = "https://capstone-4-vk50.onrender.com/api"

export async function fetchInstruments() {
  try {

    const response = await fetch(DevURL + "/instruments", {
      method: "GET",
      headers: {
        "Content-Type":"application/json"
      }
    });
    const result = await response.json();
    return result.instruments;

  } catch (error) {
    throw new Error(error);
    
  };
};

export async function getInstrumentById(id) {
  try {
    const response = await fetch(DevURL + `/instruments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type":"application/json"
      }
    });
    const result = await response.json();
    return result.instrument;
    
  } catch (error) {
    throw new Error(error);
  };
};