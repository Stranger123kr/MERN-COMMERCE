// this is function to Add product in cart

export const AddToCart = (CartInfo) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/carts`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(CartInfo),
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is  function  fetching cart products for particular user

export const fetchCartByUserId = () => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/carts`,
      {
        credentials: "include",
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is function to Update Quantity of Cart product in Carts

export const UpdateCart = (update) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/carts/${update.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(update),
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is function to Delete items in Carts as user wish

export const DeleteCartItem = (itemId) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/carts/${itemId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: { "content-type": "application/json" },
      }
    );
    await response.json();
    resolve({ data: { id: itemId } });
  });
};

// ============================================================================

// this is function to remove all  items in Carts when user finish their shopping

export const ResetCart = () => {
  // get all the items of user's cart - and then remove each
  return new Promise(async (resolve) => {
    const response = await fetchCartByUserId();
    const items = await response.data;

    for (let key of items) {
      DeleteCartItem(key.id);
    }

    resolve({ msg: " Carts have  Empty Now" });
  });
};
