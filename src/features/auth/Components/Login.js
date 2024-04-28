import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  loginUserAsync,
  selectError,
  selectLoggedInUserToken,
  selectLoginStatus,
  selectStatus,
} from "../AuthSlice";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const Status = useSelector(selectStatus);
  const LoginStatus = useSelector(selectLoginStatus);
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUserToken);
  const dispatch = useDispatch();

  // =================================
  // social login functionality

  const LoginWithGoogle = () => {
    window.open(
      "https://mern-commerce-backend-64fw.onrender.com/auth/google/callback",
      "_self"
    );
  };

  const LoginWithGithub = () => {
    window.open(
      "https://mern-commerce-backend-64fw.onrender.com/auth/github/callback",
      "_self"
    );
  };

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className=" bg-[GhostWhite] flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://cdn2.iconfinder.com/data/icons/avatars-60/5985/15-Actress-128.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(
                loginUserAsync({
                  email: data.email,
                  password: data.password,
                })
              );
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Email is not valid",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-600 font-[700]">
                  {errors.email && errors.email.message}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/Forgot_Password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password in Required",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <div className=" relative left-[93%] bottom-[1.5rem] cursor-pointer">
                  {showPassword ? (
                    <FaEye onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>

                <p className="text-red-600 font-[700]">
                  {errors.password && errors.password.message}
                  {error && LoginStatus ? error.message : null}
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {Status ? (
                  <div
                    role="status"
                    class="inline-block h-6 w-6 mr-2  animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  >
                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
                  </div>
                ) : (
                  "Login in"
                )}
              </button>
            </div>
          </form>

          <span className="block mt-2 text-center font-[500] text-[1.1rem]">
            or
          </span>

          <div className="flex flex-col sm:flex-row my-4 gap-4 sm:gap-2 justify-between">
            <button
              onClick={LoginWithGoogle}
              className="group h-12 px-3 border-2 border-gray-300 rounded-full transition duration-300 "
            >
              <div className=" flex gap-2 justify-center">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5"
                  alt="google logo"
                />
                <span className="font-semibold tracking-wide text-gray-700 text-sm sm:text-base">
                  Login via Google
                </span>
              </div>
            </button>

            <button
              onClick={LoginWithGithub}
              className="group h-12 px-3 border-2 border-gray-300 rounded-full transition duration-300 "
            >
              <div className=" flex gap-2 justify-center">
                <img
                  src="https://www.svgrepo.com/show/475654/github-color.svg"
                  className="w-5"
                  alt="google logo"
                />
                <span className="font-semibold tracking-wide text-gray-700 text-sm sm:text-base">
                  Login via Github
                </span>
              </div>
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member ?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
