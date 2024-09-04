"use client";
import Cookies from "universal-cookie";
export const isLoggedIn = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("loggedInUser");
    if (user) return true;
    else return false;
  }
  return false
};
export const logOut = () => {
  const cookies = new Cookies();
  localStorage.removeItem("loggedOutUser");
  cookies.remove("auth_token");
  cookies.remove("id");
};
