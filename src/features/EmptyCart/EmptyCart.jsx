import React from "react";
import { Link } from "react-router-dom";
const EmptyCart = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center h-screen bg-white px-2 py-2 sm:py-5 lg:px-8">
        <div className="text-center">
          <img
            className="m-[auto] w-[18rem]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXgY2__KniuYieXzn6koGTAV9WsIxplMSHTfkMwIf1sde7bnxYId7NPpfcecK5iknrj1E&usqp=CAU"
            alt="Cart_img"
          />

          <h1 className="mt-4 text-[2rem] font-bold tracking-tight text-gray-900 sm:text-[4rem]">
            Your Cart is Empty
          </h1>
          <p className="mt-6 text-[1.3rem] font-[600] leading-7 text-gray-600">
            Sorry, we couldn’t find the any items you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default EmptyCart;
