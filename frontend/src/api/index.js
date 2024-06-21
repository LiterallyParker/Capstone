import ENDPOINT from "./endpoint";

export async function fetchInstruments() {
  try {

    const response = await fetch(ENDPOINT + "/instruments", {
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
    const response = await fetch(ENDPOINT + `/instruments/${id}`, {
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