const BaseURL = "http://localhost:3001/api"

export async function userInfo(token) {
  if(!token) {
    return;
  }
  try {
    const response = await fetch(BaseURL + "/users/account", {
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

    const response = await fetch(BaseURL + "/users/register", {
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

    const response = await fetch(BaseURL + "/users/login", {
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
    const response = await fetch(BaseURL + "/users/account", {
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