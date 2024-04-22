import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";

import extend from '../styles/profile.module.css'

export default function Profile() {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "doyo@gmail.com",
      username: "",
      address: ""
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || " " });
      console.log(values);
    },
  });

  /**formik dosent support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              you can update the details
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className={styles.profile_img}
                  src={file || avatar}
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
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  placeholder="firstname"
                />
                <input
                  {...formik.getFieldProps("lastName")}
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
                  update
                </button>
              </div>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                comeback later
                <Link className="text-red-500" to="/logout">
                  logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
