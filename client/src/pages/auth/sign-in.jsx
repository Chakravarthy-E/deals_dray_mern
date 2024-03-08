import React from "react";
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

  async function handleSubmit() {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="my-4 text-3xl font-semibold tracking-wide">
        Login With Your Accout
      </h1>
      <div className="my-3 w-96 space-y-3 rounded border px-10 py-10 shadow">
        <div className="space-x-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="enter your email address"
            className="border px-3 py-1 rounded-md"
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="space-x-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="enter your password"
            className="border px-3 py-1 rounded-md"
            value={data.password}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="px-3 py-1 rounded-md bg-slate-800 text-white text-center"
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
