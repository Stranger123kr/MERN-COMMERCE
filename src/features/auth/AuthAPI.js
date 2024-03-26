// this is function for getting user information to register at first time
export const CreateUser = (UserData) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(UserData),
    });
    const data = await response.json();
    resolve({ data });
  });
};

// ===========================================================================

// this is function for getting user information to check use to login our E-commerce App

export const loginUser = (loginInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/login`,

        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginInfo),
        }
      );

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// ===========================================================================

// this is function for getting user information to check use to login our E-commerce App

export const CheckAuth = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/check`,

        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// ===========================================================================

// this is function for request reset user password

export const ResetPasswordRequest = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/reset_Password_Request`,

        {
          method: "POST",
          // credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
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
      console.log(error);
    }
  });
};

// ===========================================================================

// this is function for reset user password

export const ResetPassword = (UserInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/reset_Password`,

        {
          method: "POST",
          // credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(UserInfo),
        }
      );

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
        console.log(data);
      } else {
        const error = await response.json();
        reject(error);
        console.log(error);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// ===========================================================================

// this is function for  signOut

export const UserSignOut = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/logout`,

        {
          method: "POST",
          credentials: "include",
        }
      );
      console.log(response);
      resolve("USER SignOut");
    } catch (error) {
      reject(error);
    }
  });
};
