const BaseURL = "http://localhost:3000/api"

export async function registerUser(userObject) {
  try {

    const response = await fetch(BaseURL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(userObject)
    });

    const result = await response.json();
    if (result.error) {
      throw new Error(result.message)
    }

    return result;

  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchInstruments() {
  try {

    const response = await fetch(BaseURL + "/instruments", {
      method: "GET",
      headers: {
        "Content-Type":"application/json"
      }
    })
    const result = await response.json();
    return result.instruments

  } catch (error) {
    throw new Error(error)
  }
}