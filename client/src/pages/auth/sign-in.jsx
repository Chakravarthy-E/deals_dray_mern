import React, { useEffect } from "react";
import { useRouter } from "next/router";
import client, { apiList } from "../../utils/apiSerives";
import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../lib/slices/auth";

export default function Signin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState({});

  async function handleSubmit() {
    if (!data.email || !data.password) {
      seterror({ message: "Please fill in all required fields" });
      return;
    }
    try {
      const response = await client.post(apiList.SIGNIN, data);
      console.log(response);
      if (response.status === 200) {
        Cookies.set("AUTH", response.data?.token);
        router.push("/");
      }
      dispatch(updateProfile(response.data?.profile));
    } catch (error) {
      console.log(error);
    }
  }
  const token = Cookies.get("AUTH");
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="my-4 text-3xl font-semibold tracking-wide">
        Login With Your Accout
      </h1>
      <div className="my-3 w-96 space-y-3 rounded border px-10 py-10 shadow">
        <div className=" flex items-center space-x-3">
          <label htmlFor="email" className="w-40">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="enter your email address"
            className="border px-3 py-1 rounded-md w-full"
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="space-x-3 flex items-center">
          <label htmlFor="password" className="w-40">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="enter your password"
            className="border px-3 py-1 rounded-md w-full"
            value={data.password}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        {error.message && <p className="text-red-500">{error.message}</p>}
        <button
          onClick={handleSubmit}
          type="submit"
          className="px-3 py-1 rounded-md bg-slate-800 text-white text-center w-full"
        >
          Login
        </button>
        <p className="text-center mt-3">
          Don't have Account ?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => router.push("/auth/sign-up")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
