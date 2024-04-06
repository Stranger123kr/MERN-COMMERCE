// this is function to Add User Order Details or etc in order

export const CreateOrder = (order) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order),
    });
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is function to fetch all order for  admin panel

export const fetchAllOrders = (pagination) => {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/admin?${queryString}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    const totalOrder = response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrder } });
  });
};

// ============================================================================

// this is function to fetch order by id

export const fetchOderById = (id) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/admin/${id}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is function to Update User Order Details or etc in order

export const OrderWithPayment = (amount) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/create/payment`,
      {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ amount }),
      }
    );
    const data = await response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is function to Update User Order Details or etc in order

export const UpdateOrder = (order) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/${order.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(order),
      }
    );
    const data = response.json();
    resolve({ data });
  });
};
