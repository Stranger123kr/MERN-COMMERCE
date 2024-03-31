// this is  function for fetching particular product for product detail  page

export const FetchProductsById = (id) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/products/${id}`,
      {
        credentials: "include",
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

// =========================================================

// this is filter function for filtering products for particular situation

export const FetchProductsByFilter = (search, filter, sort, pagination) => {
  let queryString = "";
  for (let key in filter) {
    const CategoriesValues = filter[key];
    if (CategoriesValues.length) {
      queryString += `${key}=${CategoriesValues}&`;
    }
  }

  // ================================================

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  // ================================================

  for (let key in search) {
    queryString += `${key}=${search[key]}&`;
  }

  // ================================================

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/products?${queryString}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    const totalPages = response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalPages: +totalPages } });
  });
};

// ==========================================================

// this is  function for fetching Products Categories

export const FetchCategories = () => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://mern-commerce-backend-64fw.onrender.com/categories",
      {
        credentials: "include",
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

// ===========================================================

// // this is  function for fetching Products Brands

export const FetchBrands = () => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://mern-commerce-backend-64fw.onrender.com/brands",
      {
        credentials: "include",
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

// ===========================================================

// this is  function for Creating a products and this function for admin

export const CreateProducts = (productInfo) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://mern-commerce-backend-64fw.onrender.com/products",
      {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(productInfo),
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

// ===========================================================

// this is  function for Updating a products and this function for admin

export const UpdateProducts = (productInfo) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/products/${productInfo.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(productInfo),
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

// =============================================================

// this is  function for Updating a products and this function for admin

export const DeleteProducts = (id) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://mern-commerce-backend-64fw.onrender.com/products/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: { "content-type": "application/json" },
      }
    );
    const data = response.json();
    resolve({ data: { id } });
  });
};
