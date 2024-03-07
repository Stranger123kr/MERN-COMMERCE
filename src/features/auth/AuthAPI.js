// this is function for getting user information to register at first time
export const CreateUser = (UserData) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/auth/signup`, {
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
    try {
      const response = await fetch(
        `http://localhost:8080/auth/login`,

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginInfo),
        }
      );

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// ===========================================================================

// this is function for  signOut

export const UserSignOut = (userId) => {
  return new Promise(async (resolve) => {
    // TODO : on server we will remove user session info
    resolve({ msg: "User Logout Successfully" });
  });
};
