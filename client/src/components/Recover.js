import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useNavigate } from "react-router-dom";

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const { OTP, setOTP } = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) return toast.success("OTP has been send to your email");
      return toast.error("problem while generating OTP");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();

    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status == 201) {
        toast.success("verify successfuly");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("wrong otp!check mail again");
    }
  }

  //handler of resend OTP
  function resendOTP() {
    let sendPromise = generateOTP(username);

    toast.promise(sendPromise, {
      loading: "sending..",
      success: <b>otp has been send to your email</b>,
      error: <b>could not send it</b>,
    });

    sendPromise.then((OTP) => {
      console.log(OTP);
    });
  }

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
          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center ">
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  type="text"
                  placeholder="OTP"
                />
              </div>
              <span className="py-4 text-sm text-left text-gray-500">
                enter 6 digit OTP sent to your email adress
              </span>

              <button className={styles.btn} type="submit">
                recover
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
