// this is function to  fetch all user

export const fetchLoggedInUser = (userId) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/users/${userId}`);
    const data = response.json();
    resolve({ data });
  });
};

// ======================================================================

// this is function to  fetch all orders particular user

export const fetchLoggedInUserOrders = (userId) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:3004/orders/?user.id=${userId}`
    );
    const data = response.json();
    resolve({ data });
  });
};

// ======================================================================

// this is function for Updating  user information

export const UpdateUser = (update) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/users/${update.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
    const data = await response.json();
    resolve({ data });
  });
};

// ===========================================================================
