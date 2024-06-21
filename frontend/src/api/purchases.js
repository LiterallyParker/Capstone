const DevURL = "http://localhost:3000/api";
const ProductionURL = "https://capstone-4-vk50.onrender.com/api"

export async function addPurchase({ token, items }) {

  try {

    const response = await fetch(DevURL + "/purchases", {
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
    const response = await fetch(DevURL + "/purchases", {
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