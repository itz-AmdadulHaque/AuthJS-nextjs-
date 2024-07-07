"use client";

import SocialLogins from "./SocialLogins";

import { doCredentialLogin } from "@/app/actions";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  // this is not a server action so it wont recive formdata like server action does
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);
      console.log(response)

      // this is only work if you send a error response
      // here we don't sent any, only thow error in authjs credentials login logic,
      // so, every error will handle by catch part
      if (!!response.error) {
        console.error("///Onsubmit error: ", response);
        setError(response?.error);
      } else {
        // router.push("/home");  //when login with credential navbar doesnot update
        window.location.href = "/home" // make sure to reload full page, inlcuding layout, so navbar updates
      }
    } catch (e) {
      console.log("////error: ", e.message);
      setError(e.message || "Check your Credentials");
    }
  }

  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <form
        className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
        onSubmit={onSubmit}
      >
        <div className="my-2">
          <label htmlFor="email">Email Address</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
        >
          Ceredential Login
        </button>
      </form>
      <SocialLogins />
    </>
  );
};

export default LoginForm;
