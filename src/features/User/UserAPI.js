// this is function to  fetch all user

export const fetchLoggedInUser = () => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/users/own`,
      {
        credentials: "include",
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

// ======================================================================

// this is function to  fetch all orders particular user

export const fetchLoggedInUserOrders = () => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/orders`,
      {
        credentials: "include",
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

// ======================================================================

// this is function for Updating  user information

export const UpdateUser = (update) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/users/${update.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      }
    );
    const data = await response.json();
    resolve({ data });
  });
};

// ===========================================================================
