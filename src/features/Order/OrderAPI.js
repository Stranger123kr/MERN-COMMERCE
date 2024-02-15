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
