import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserAsync, selectUserCheck, selectUserInfo } from "../UserSlice";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Dialogs from "../../Common/Dialogs";
import { toast } from "react-toastify";
const UserProfile = () => {
  const user = useSelector(selectUserInfo);
  const userCheck = useSelector(selectUserCheck);
  const dispatch = useDispatch();
  // ==================================================================

  const [showAddedForm, setShowAddedForm] = useState(false);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);

  // ==================================================================

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // ==================================================================

  const UpdateAddress = (index, data) => {
    const newUpdate = { ...user, addresses: [...user.addresses] };
    newUpdate.addresses.splice(index, 1, data);
    dispatch(UpdateUserAsync(newUpdate));
    setSelectedEditIndex(-1);
  };

  const handleEditFrom = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };

  // ==================================================================

  const handleAdded = (address) => {
    const newUpdate = { ...user, addresses: [...user.addresses, address] };
    dispatch(UpdateUserAsync(newUpdate));
    setShowAddedForm(false);
  };

  // ==================================================================

  const [openDialog, setOpenDialog] = useState(-1);

  const DeleteAddress = (index, name) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(UpdateUserAsync(newUser));
    toast.success(<h3 className="font-bold">{name} Address Deleted</h3>);
  };

  // ==================================================================

  console.log(user);

  return (
    <>
      {userCheck && (
        <div className=" pb-[2rem]">
          <div>
            <div className="mx-auto relative bg-white rounded-[1rem] max-w-5xl px-4 mt-[2rem]  sm:px-6 lg:px-[5rem]">
              <img
                className="m-auto p-2 rounded-full  h-[7rem] w-[7rem]"
                src={
                  user.image
                    ? user.image
                    : `https://cdn2.iconfinder.com/data/icons/avatars-60/5985/13-Captain-512.png`
                }
                alt="Profile_img"
              />

              <h3 className="text-[1.5rem] my-5 font-bold tracking-tight text-gray-500">
                Name : {user.name ? user.name : "Guest User"}
              </h3>
              <h3 className="text-[1.5rem] my-5 font-bold tracking-tight text-gray-500">
                Email : {user.email}
              </h3>
              {user.role === "admin" && (
                <h3 className="text-[1.5rem] my-5 font-bold tracking-tight text-gray-500">
                  Role : {user.role}
                </h3>
              )}

              <button
                type="Submit"
                onClick={() => {
                  setShowAddedForm(!showAddedForm);
                  setSelectedEditIndex(-1);
                }}
                className="rounded-md absolute right-5 sm:px-7 sm:py-2  bg-red-600 px-[0.4rem] py-[0.4rem]  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Address
              </button>

              {
                // add address form part start
              }

              {showAddedForm ? (
                <div className="mx-auto bg-white rounded-[0.7rem] max-w-5xl px-4 my-[3rem]  lg:px-[5rem] py-[2rem]">
                  <form
                    onSubmit={handleSubmit((data) => {
                      reset();
                      handleAdded(data);
                    })}
                  >
                    <div className="border-b border-gray-900/10 pb-5">
                      <h2 className="text-[2rem]  font-[700] leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-3 text-[1rem] leading-6 text-gray-700">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name is Required",
                              })}
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <p className="text-red-600 font-[700]">
                            {errors.name && errors.name.message}
                          </p>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              type="tel"
                              {...register("phone", {
                                required: "phone is Required",

                                minLength: {
                                  value: 10,
                                  message: "Phone must be at least 10 digits",
                                },
                                maxLength: {
                                  value: 10,
                                  message: "Phone must be at most 10 digits",
                                },
                              })}
                              id="phone"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <p className="text-red-600 font-[700]">
                            {errors.phone && errors.phone.message}
                          </p>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "street Address is Required",
                              })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <p className="text-red-600 font-[700]">
                            {errors.street && errors.street.message}
                          </p>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "city is Required",
                              })}
                              id="city"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <p className="text-red-600 font-[700]">
                            {errors.city && errors.city.message}
                          </p>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "state is Required",
                              })}
                              id="state"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <p className="text-red-600 font-[700]">
                            {errors.state && errors.state.message}
                          </p>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pinCode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pinCode", {
                                required: "pinCode is Required",
                              })}
                              id="pinCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <p className="text-red-600 font-[700]">
                          {errors.pinCode && errors.pinCode.message}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center justify-end gap-x-6">
                        <button
                          onClick={() => reset()}
                          type="button"
                          className="rounded-md  bg-red-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          Reset Page
                        </button>
                        <button
                          type="Submit"
                          className="rounded-md  bg-indigo-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}
              {
                // add address form part end
              }

              <h3 className="text-[1.4rem] my-[1rem] font-bold text-gray-500">
                Your Addresses :
              </h3>
              <div className="border-t  border-gray-300 px-4 py-3 sm:px-6">
                {
                  // edit address form part start
                }
                {user &&
                  user.addresses.map((address, index) => (
                    <div key={index}>
                      {selectedEditIndex === index ? (
                        <div
                          className="mx-auto bg-white rounded-[0.7rem] max-w-5xl px-4 my-[3rem]
                    lg:px-[5rem] py-[2rem]"
                        >
                          <form
                            onSubmit={handleSubmit((data) => {
                              reset();
                              UpdateAddress(index, data);
                            })}
                          >
                            <div className="border-b border-gray-900/10 pb-5">
                              <h2 className="text-[2rem]  font-[700] leading-7 text-gray-900">
                                Personal Information
                              </h2>
                              <p className="mt-3 text-[1rem] leading-6 text-gray-700">
                                Use a permanent address where you can receive
                                mail.
                              </p>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Full name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      {...register("name", {
                                        required: "name is Required",
                                      })}
                                      id="name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                  <p className="text-red-600 font-[700]">
                                    {errors.name && errors.name.message}
                                  </p>
                                </div>

                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Phone
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="tel"
                                      {...register("phone", {
                                        required: "phone is Required",

                                        minLength: {
                                          value: 10,
                                          message:
                                            "Phone must be at least 10 digits",
                                        },
                                        maxLength: {
                                          value: 10,
                                          message:
                                            "Phone must be at most 10 digits",
                                        },
                                      })}
                                      id="phone"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                  <p className="text-red-600 font-[700]">
                                    {errors.phone && errors.phone.message}
                                  </p>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="street"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Street address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      {...register("street", {
                                        required: "street Address is Required",
                                      })}
                                      id="street"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                  <p className="text-red-600 font-[700]">
                                    {errors.street && errors.street.message}
                                  </p>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    City
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      {...register("city", {
                                        required: "city is Required",
                                      })}
                                      id="city"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                  <p className="text-red-600 font-[700]">
                                    {errors.city && errors.city.message}
                                  </p>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="state"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    State / Province
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      {...register("state", {
                                        required: "state is Required",
                                      })}
                                      id="state"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                  <p className="text-red-600 font-[700]">
                                    {errors.state && errors.state.message}
                                  </p>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="pinCode"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    ZIP / Postal code
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      {...register("pinCode", {
                                        required: "pinCode is Required",
                                      })}
                                      id="pinCode"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                                <p className="text-red-600 font-[700]">
                                  {errors.pinCode && errors.pinCode.message}
                                </p>
                              </div>

                              <div className="mt-8 flex items-center justify-end gap-x-6">
                                <button
                                  onClick={() => setSelectedEditIndex(-1)}
                                  type="button"
                                  className="rounded-md  bg-red-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="Submit"
                                  onClick={() => setShowAddedForm(false)}
                                  className="rounded-md  bg-indigo-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Edit Address
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      ) : null}

                      <ul className="py-5 font-[400]">
                        <div className="flex gap-7 cursor-pointer relative top-[5rem] text-[1.3rem] justify-end">
                          <FaRegEdit
                            onClick={() => {
                              handleEditFrom(index);
                              setShowAddedForm(false);
                            }}
                          />

                          <MdDelete onClick={() => setOpenDialog(index)} />

                          {
                            <Dialogs
                              title={`Delete ${address.name}`}
                              message="Are you sure you want to delete this address ?"
                              dangerOption="Delete"
                              cancelAction={() => setOpenDialog(-1)}
                              dangerAction={() =>
                                DeleteAddress(index, address.name)
                              }
                              showDialogs={openDialog === index}
                            ></Dialogs>
                          }
                        </div>
                        <li>
                          Name :{" "}
                          <span className="text-[1rem] font-bold">
                            {address.name}
                          </span>
                        </li>
                        <li>
                          Street :{" "}
                          <span className="text-[1rem] font-bold">
                            {address.street}
                          </span>
                        </li>
                        <li>
                          PinCode :{" "}
                          <span className="text-[1rem] font-bold">
                            {address.pinCode}
                          </span>
                        </li>
                        <li>
                          City :{" "}
                          <span className="text-[1rem] font-bold">
                            {address.city}
                          </span>
                        </li>
                        <li>
                          State :{" "}
                          <span className="text-[1rem] font-bold">
                            {address.state}
                          </span>
                        </li>
                        <li>
                          Phone Number :{" "}
                          <span className="text-[1rem] font-bold">
                            {address.phone}
                          </span>
                        </li>
                      </ul>
                    </div>
                  ))}
              </div>
              {
                // edit address form part end
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
