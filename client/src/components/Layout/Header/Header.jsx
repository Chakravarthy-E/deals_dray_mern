import React from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { getAuthState } from "../../../lib/slices/auth";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const token = Cookies.get("AUTH");
  const { profile } = useSelector(getAuthState);
  console.log(profile);
  const handleLogOut = () => {
    Cookies.remove("AUTH");
    router.push("/auth/sign-in");
    alert("Successfully logged out");
  };
  return (
    <nav className="border-b z-50  px-5 py-5 fixed w-full bg-slate-100 flex items-center justify-between">
      <div className="text-xl font-bold tracking-wide uppercase">DealsDray</div>
      {token && (
        <div className="flex items-center justify-center space-x-6">
          <div
            onClick={() => router.push("/employee-list")}
            className="cursor-pointer hover:underline"
          >
            Employees List
          </div>
          <div>{profile?.name}</div>
          <div
            className="bg-gray-800 text-white px-3 py-1 rounded-md text-xs cursor-pointer"
            onClick={handleLogOut}
          >
            Log Out
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
