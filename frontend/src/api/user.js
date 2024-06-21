const DevURL = "http://localhost:3000/api";
const ProductionURL = "https://capstone-4-vk50.onrender.com/api"

export async function userInfo(token) {

  if(!token) {
    return;
  }

  try {
    const response = await fetch(DevURL + "/users/account", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

  });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  };
};

export async function registerUser(userObject) {
  try {

    const response = await fetch(DevURL + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(userObject)
      
    });
    const result = await response.json();

    return result;

  } catch (error) {
    throw new Error(error);
  };
};


export async function loginUser(userObject) {
  try {

    const response = await fetch(DevURL + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(userObject)
      
    });
    const result = await response.json();

    return result;

  } catch (error) {
    console.error(error);
  };
};

export async function updateUser(token, { firstname, lastname, email, password, newPassword }) {
  try {
    const response = await fetch(DevURL + "/users/account", {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        newPassword
      })
    });
    const result = response.json();
    return result;
    
  } catch (error) {
    console.error(error)
  }

}