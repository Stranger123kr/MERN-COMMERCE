import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateProductsAsync,
  FetchProductsByIdAsync,
  UpdateProductsAsync,
  selectBrands,
  selectCategories,
  selectProductsById,
} from "../../Products/ProductsSlice";
import { useParams } from "react-router-dom";

const ProductsForm = () => {
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();
  const { id } = useParams();

  // =======================================================

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // =======================================================
  const ProductData = useSelector(selectProductsById);

  // =======================================================

  useEffect(() => {
    if (id) {
      dispatch(FetchProductsByIdAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      setValue("title", ProductData.title);
      setValue("description", ProductData.description);
      setValue("price", ProductData.price);
      setValue("discountPercentage", ProductData.discountPercentage);
      setValue("stock", ProductData.stock);
      setValue("brand", ProductData.brand);
      setValue("category", ProductData.category);
      setValue("thumbnail", ProductData.thumbnail);
      setValue("image1", ProductData.images && ProductData.images[0]);
      setValue("image2", ProductData.images && ProductData.images[1]);
      setValue("image3", ProductData.images && ProductData.images[2]);
      setValue("image4", ProductData.images && ProductData.images[3]);
      setValue("image5", ProductData.images && ProductData.images[4]);
    }
  }, [ProductData, setValue]);

  // =======================================================

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit((data) => {
            reset();
            const productInfo = {
              title: data.title,
              description: data.description,
              price: +data.price,
              discountPercentage: +data.discountPercentage,
              rating: +data.rating,
              stock: +data.stock,
              brand: data.brand,
              category: data.category,
              thumbnail: data.thumbnail,
              rating: ProductData.rating || (data.rating = 0),
              images: [
                data.image1,
                data.image2,
                data.image3,
                data.image4,
                data.image5,
              ],
            };

            if (id) {
              productInfo.id = +id;
              dispatch(UpdateProductsAsync(productInfo));
            } else {
              dispatch(CreateProductsAsync(productInfo));
            }
          })}
        >
          <div className="space-y-12 bg-white p-[2.5rem] rounded-lg">
            <h2 className="text-[2.3rem] font-[700] leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("title", { required: "title is required" })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    pattern="[0-9]+"
                    {...register("price", { required: "price is required" })}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product DiscountPercentage
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("discountPercentage", {
                      required: "discountPercentage is required",
                    })}
                    id="discountPercentage"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    pattern="[0-9]+"
                    id="stock"
                    {...register("stock", { required: "stock is required" })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", { required: "brand is required" })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Choose brand</option>
                    {brands.map((brand, index) => (
                      <option key={index} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Choose category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    id="thumbnail"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image1", {
                      required: "image1 is required",
                    })}
                    id="image1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image2")}
                    id="image2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image3")}
                    id="image3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="image4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 4
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image4")}
                    id="image4"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="image5"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 5
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image5")}
                    id="image5"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={() => reset()}
                type="button"
                className="rounded-md  bg-red-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Reset Page
              </button>
              <button
                type="submit"
                className="rounded-md  bg-violet-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                {!id ? "Add Product" : "Edit Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductsForm;
