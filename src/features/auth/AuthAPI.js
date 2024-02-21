// this is function for getting user information to register at first time
export const CreateUser = (UserData) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(UserData),
    });
    const data = await response.json();
    resolve({ data });
  });
};

// ===========================================================================

// this is function for getting user information to check use to login our E-commerce App

export const CheckUser = (loginInfo) => {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch(`http://localhost:3004/users?email=${email}`);
    const data = await response.json();

    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Invalid Credential" });
      }
    } else {
      reject({ message: "User not found SignUp first" });
    }
  });
};

// ===========================================================================
