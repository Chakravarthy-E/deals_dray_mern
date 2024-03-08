import Cookies from "js-cookie";

export const setToLocalStorage = (key, value) => {
  Cookies.set(key, value);
};

export const getFromLocalStorage = (key) => {
  try {
    return Cookies.get("AUTH");
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  Cookies.remove(key);
};

export const Keys = {
  AUTH_TOKEN: "AUTH",
};
