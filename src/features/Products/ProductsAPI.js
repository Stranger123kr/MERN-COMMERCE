// this is  function for fetching all products in home page

export const FetchAllProducts = () => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3004/products");
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is  function for fetching particular product for product detail  page

export const FetchProductsById = (id) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/products/${id}`);
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is filter function for filtering products for particular situation

export const FetchProductsByFilter = (filter, sort, pagination) => {
  // filter  = {"Category : ["smartphone","laptops"}
  // sort  = {_sort:"rating",_order:"asc"}
  let queryString = "";
  for (let key in filter) {
    const CategoriesValues = filter[key];
    if (CategoriesValues.length > 0) {
      const LastCategoriesValues =
        CategoriesValues[CategoriesValues.length - 1];
      queryString += `${key}=${LastCategoriesValues}&`;
    }
  }

  // ================================================

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  // ================================================

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:3004/products?${queryString}`
    );
    const data = await response.json();
    const totalPages = response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalPages: +totalPages } });
  });
};

// ============================================================================

// this is  function for fetching Products Categories

export const FetchCategories = () => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3004/categories");
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// // this is  function for fetching Products Brands

export const FetchBrands = () => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3004/brands");
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is  function for Creating a products and this function for admin

export const CreateProducts = (productInfo) => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3004/products", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(productInfo),
    });
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is  function for Updating a products and this function for admin

export const UpdateProducts = (productInfo) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:3004/products/${productInfo.id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(productInfo),
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

// ============================================================================

// this is  function for Updating a products and this function for admin

export const DeleteProducts = (id) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3004/products/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data: { id } });
  });
};
