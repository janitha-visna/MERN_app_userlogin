import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { updateUser } from "../helper/helper";
import {  useNavigate } from "react-router-dom";

import extend from "../styles/profile.module.css";

export default function Profile() {
  const [file, setFile] = useState();
  
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      firstname: apiData?.firstname || "",
      lastname: apiData?.lastname || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || apiData?.profile ||" " });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "updating..",
        success: <b>update successfully!</b>,
        error: (error) => {
          console.error("Error occurred while updating:", error);
          return <b>Could not update. Please try again later.</b>;
        },
      });
      console.log(values);
    },
  });

  /**formik doesn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

//logout handler funtion
function userLogout(){
  localStorage.removeItem('token');
  navigate('/')
}



  if (isLoading)
    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );

  if (serverError)
    return (
      <div className="container mx-auto">
        <h1 className="text-xl text-red-500">{serverError.message}</h1>
      </div>
    );

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className={styles.profile_img}
                  src={apiData?.profile || file || avatar}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstname")}
                  type="text"
                  placeholder="firstname"
                />
                <input
                  {...formik.getFieldProps("lastname")}
                  type="text"
                  placeholder="lastname"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  type="text"
                  placeholder="mobile"
                />
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  placeholder="email"
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("address")}
                  type="text"
                  placeholder="address"
                />
                <button className={styles.btn} type="submit">
                  Update
                </button>
              </div>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later
                <button onClick={userLogout} className="text-red-500" to="/logout">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
