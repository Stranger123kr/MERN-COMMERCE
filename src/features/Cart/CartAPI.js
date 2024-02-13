// this is function to Add product in cart

export const AddToCart = (CartInfo) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/carts`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(CartInfo),
    });
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is  function  fetching cart products for particular user

export const fetchCartByUserId = (UserId) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/carts?user=${UserId}`);
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is function to Update Quantity of Cart product in Carts

export const UpdateCart = (update) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/carts/${update.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(update),
    });
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is function to Update Quantity of Cart product in Carts

export const DeleteCartItem = (itemId) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/carts/${itemId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
};
