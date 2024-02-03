// this is  function for fetching all products in home page

export const FetchAllProducts = () => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3004/products");
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is filter function for filtering products for particular situation

export const FetchProductsByFilter = (filter) => {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:3004/products?${queryString}`
    );
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is filter function for filtering products for particular situation
