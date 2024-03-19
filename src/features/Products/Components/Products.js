import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import { StarIcon } from "@heroicons/react/20/solid";

import { Link } from "react-router-dom";
import {
  FetchCategoriesAsync,
  FetchBrandsAsync,
  selectProducts,
  selectTotalProductsPage,
  FetchProductsByFilterAsync,
  selectCategories,
  selectBrands,
  selectProductsById,
} from "../ProductsSlice";
import LoadingSpinner from "../../Common/LoadingSpinner/LoadingSpinner";
import { ITEMS_PER_PAGE, discountPrice } from "../../../app/Constant";
import Pagination from "../../Common/Pagination";
import { AddToCartAsync, selectCarts } from "../../Cart/CartSlice";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";
// ============================================================================

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

// ============================================================================

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ============================================================================

const Products = () => {
  // ============================================================================

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const ProductData = useSelector(selectProducts);
  const ProductDataById = useSelector(selectProductsById);
  const totalProducts = useSelector(selectTotalProductsPage);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);

  // ============================================================================

  const dispatch = useDispatch();
  const { status } = ProductData;

  // ============================================================================

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];

  // ============================================================================

  const [filter, setFilter] = useState({});

  const handleFilter = (e, option, section) => {
    let newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (elm) => elm === option.value
      );
      newFilter[section.id].splice(index, 1);
    }

    setFilter(newFilter);
    setPage(1);
  };

  // ============================================================================

  // this is searching functionality by improving
  //  debouncing implementation

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearch = (searchItem) => {
    const newSort = { ...search, _search: searchItem };
    setDebouncedSearch(newSort);
  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setSearch(debouncedSearch);
      setPage(1);
    }, 1000);

    return () => clearTimeout(searchTimeout);
  }, [debouncedSearch]);

  // ============================================================================

  const [sort, setSort] = useState({});
  const handleSort = (option) => {
    const newSort = { ...sort, _sort: option.sort, _order: option.order };
    setSort(newSort);
    setPage(1);
  };

  // ============================================================================

  // this is Pagination functionality materials

  const [Page, setPage] = useState(1);

  // ============================================================================
  // to check product is already in cart or not : to implement duplicate problem
  const GetAddToCart = useSelector(selectCarts);
  const handleAddToCart = (productId) => {
    const CheckingProductInCart = GetAddToCart.filter(
      (items) => items.product.id === productId
    );

    if (CheckingProductInCart.length <= 0) {
      dispatch(
        AddToCartAsync({
          quantity: 1,
          product: productId,
        })
      );
      toast.success(<h3 className="font-bold"> 🛒 item added to cart</h3>);
    } else {
      toast.info(<h3 className="font-bold"> 🛒 item already in your cart</h3>);
    }

    // TODO : it will be based on the server response
  };

  // ============================================================================

  useEffect(() => {
    const pagination = { _page: Page, _limit: ITEMS_PER_PAGE };
    dispatch(FetchProductsByFilterAsync({ search, filter, sort, pagination }));
  }, [dispatch, search, filter, sort, Page]);

  // ============================================================================

  useEffect(() => {
    dispatch(FetchCategoriesAsync());
    dispatch(FetchBrandsAsync());
  }, []);

  // ============================================================================

  return (
    // =========== This is Filter Layout start ================
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        onChange={(e) =>
                                          handleFilter(e, option, section)
                                        }
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center relative right-[6rem] sm:right-[0rem] sm1:right-[4rem] sm0:right-[6rem]">
              {
                // this is search bar start
              }

              <div className="relative mt-3 left-[8rem] sm:left-[10rem] top-[4rem] mx-auto">
                <input
                  className="bg-white border-gray-500 lg:w-[25rem] h-10 px-5 pr-16 text-sm rounded-[0.4rem] focus:border-transparent"
                  type="search"
                  name="search"
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search for Products"
                />
                <span className="absolute right-[1rem] top-0 mt-3 mr-4">
                  <CiSearch></CiSearch>
                </span>
              </div>
              {
                // this is search bar end
              }
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e) => handleSort(option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All Products
              </h1>
            </div>
            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    onChange={(e) =>
                                      handleFilter(e, option, section)
                                    }
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {
                    // =========== This is Products Layout start ================
                    <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                        {status ? (
                          <LoadingSpinner />
                        ) : (
                          <div className="mt-6 grid grid-cols-1  gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            {ProductData &&
                            ProductData.products.length !== 0 ? (
                              ProductData.products.map((product) => (
                                <div
                                  key={product.id}
                                  className="group relative border-2 border-gray-300 h-[27rem] rounded-lg solid p-[1rem]"
                                >
                                  <div>
                                    <Link to={`/product_detail/${product.id}`}>
                                      <div className="aspect-h-1  aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-[15rem]">
                                        <img
                                          src={product.thumbnail}
                                          alt="Products thumbnail"
                                          className="h-full w-full   object-fill object-center lg:h-full lg:w-full"
                                        />
                                      </div>
                                      <div className="mt-4 flex justify-between">
                                        <div>
                                          <h3 className="text-lg font-[600] text-gray-700">
                                            {product.title.slice(0, 20)}
                                          </h3>
                                          <p className="text-sm  mt-2  font-medium text-gray-900">
                                            {product.rating}
                                            <StarIcon className="w-4 h-4 text-gray-500 inline-flex mb-[0.3rem] ml-[0.6rem]"></StarIcon>
                                          </p>
                                        </div>
                                        <div className="mt-1 flex flex-col gap-y-[0.3rem]">
                                          <p className="text-sm font-medium text-gray-400 line-through">
                                            ₹ {product.price.toLocaleString()}
                                          </p>
                                          <p className="text-sm font-medium text-gray-900">
                                            ₹{" "}
                                            {discountPrice(
                                              product
                                            ).toLocaleString()}
                                          </p>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                  <ShoppingCartIcon
                                    onClick={() => handleAddToCart(product.id)}
                                    className={`w-[1.5rem] text-green-800 ${
                                      product.stock <= 0 ? "hidden" : "block"
                                    }  cursor-pointer absolute right-[1rem] bottom-[0rem] my-5`}
                                  />
                                  {product.stock <= 0 ? (
                                    <p className="text-[1.3rem] font-medium mt-2 text-red-500">
                                      Out of Stock
                                    </p>
                                  ) : null}
                                </div>
                              ))
                            ) : (
                              <h1 className="text-[1.4rem] font-bold">
                                Result Not Found
                              </h1>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    // =========== This is Products Layout end ================
                  }
                </div>
              </div>
            </section>
            {
              // =========== This is Pagination Layout start ================

              <Pagination
                Page={Page}
                setPage={setPage}
                totalItems={totalProducts}
              />

              // =========== This is Pagination Layout end ================
            }
          </main>
        </div>
      </div>
    </>
  );
};

export default Products;
