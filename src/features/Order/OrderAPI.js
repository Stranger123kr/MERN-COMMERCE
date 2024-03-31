// this is function to Add User Order Details or etc in order

export const CreateOrder = (order) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/orders`,
      {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(order),
      }
    );
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
      `https://mern-commerce-backend-64fw.onrender.com/admin?${queryString}`,
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
      `https://mern-commerce-backend-64fw.onrender.com/orders/admin/${id}`,
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
      `https://mern-commerce-backend-64fw.onrender.com/create/payment`,
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
      `https://mern-commerce-backend-64fw.onrender.com/orders/${order.id}`,
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
