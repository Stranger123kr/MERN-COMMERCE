// this is function to Add User Order Details or etc in order

export const CreateOrder = (order) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/orders`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order),
    });
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is function to fetch all order for  admin panel

export const fetchAllOrders = (sort, pagination) => {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/orders?${queryString}`);
    const data = await response.json();
    const totalOrder = response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrder } });
  });
};

// ============================================================================

// this is function to Update User Order Details or etc in order

export const UpdateOrder = (order) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/orders/${order.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order),
    });
    const data = response.json();
    resolve({ data });
  });
};
