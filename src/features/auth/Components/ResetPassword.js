import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ResetPasswordAsync,
  selectPasswordReset,
  selectStatus,
} from "../AuthSlice";
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const queryParams = new URLSearchParams(window.location.search);

  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const passwordReset = useSelector(selectPasswordReset);
  const Status = useSelector(selectStatus);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {token && email ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://cdn2.iconfinder.com/data/icons/avatars-60/5985/15-Actress-128.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter new password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  ResetPasswordAsync({
                    password: data.password,
                    token,
                    email,
                  })
                );
              })}
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password in Required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `at least 8 characters\n
                must contain at least 1 uppercase letter,\n
                1 lowercase letter, and 1 number\n
                Can contain special characters`,
                      },
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
                  </p>
                </div>
              </div>{" "}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="confirm_password"
                    {...register("confirm_password", {
                      required: "confirm password is required",

                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "password is not matching",
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
                    {errors.confirm_password && errors.confirm_password.message}
                  </p>

                  <p className="text-red-600 font-[700]">
                    {passwordReset &&
                      "Password Reset Successfully go to login Page"}
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
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member ?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                login In
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <h3>Incorrect Link or Expire</h3>
      )}
    </>
  );
};

export default ResetPassword;
