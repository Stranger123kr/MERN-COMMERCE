// this is function to Add product in cart

export const AddToCart = (CartInfo) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/carts`, {
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
    const response = await fetch(`http://localhost:8080/carts?user=${UserId}`);
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is function to Update Quantity of Cart product in Carts

export const UpdateCart = (update) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/carts/${update.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(update),
    });
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is function to Delete items in Carts as user wish

export const DeleteCartItem = (itemId) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/carts/${itemId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data: { id: itemId } });
  });
};

// ============================================================================

// this is function to remove all  items in Carts when user finish their shopping

export const ResetCart = (userId) => {
  // get all the items of user's cart - and then remove each
  return new Promise(async (resolve) => {
    const response = await fetchCartByUserId(userId);
    const items = await response.data;

    for (let key of items) {
      DeleteCartItem(key.id);
    }

    resolve({ msg: " Carts have  Empty Now" });
  });
};
