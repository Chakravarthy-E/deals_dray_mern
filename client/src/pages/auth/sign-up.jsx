import { useRouter } from "next/router";
import client, { apiList } from "../../utils/apiSerives";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    try {
      const response = await client.post(apiList.SIGNUP, data);
      if (response.status === 201) {
        alert("Account created successfully");
        router.push("/auth/sign-in");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="my-4 text-3xl font-semibold tracking-wide">
        Create Your Accout
      </h1>
      <div className="my-3 w-96 space-y-3 rounded border px-10 py-10 shadow">
        <div className="space-x-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="text"
            placeholder="enter your name here"
            className="border px-3 py-1 rounded-md"
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
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
          onClick={handleSignUp}
          className="px-3 py-1 rounded-md bg-slate-800 text-white text-center"
        >
          SignUp
        </button>
        <p className="text-center mt-3">
          Already have Account ?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => router.push("/auth/sign-in")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
