import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";

export default function Recovery() {
    
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">recovery!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              enter OTP to recover password
            </span>
          </div>
          <form className="pt-20">
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center ">
                <input type="text" placeholder="OTP" />
              </div>
              <span className="py-4 text-sm text-left text-gray-500">
                enter 6 digit OTP sent to your email adress
              </span>

              <button className={styles.btn} type="submit">
                sign in{" "}
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                {" "}
                cant get the OTP{" "}
                <button className="text-red-500">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
