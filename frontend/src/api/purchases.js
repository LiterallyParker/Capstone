import ENDPOINT from "./endpoint";

export async function addPurchase({ token, items }) {

  try {

    const response = await fetch(ENDPOINT + "/purchases", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body: JSON.stringify({items})
      
    });
    const result = await response.json();

    return result;

  } catch (error) {
    throw new Error(error);
  };
};

export async function getUserPurchases(token) {
  try {
    const response = await fetch(ENDPOINT + "/purchases", {
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
    });
    const result = await response.json();

    return result;

  } catch (error) {
    throw new Error(error)
  }
}