import axios from "axios";
import { Keys, getFromLocalStorage } from "./storage";
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

export const getClient = async (headers) => {
  const token = await getFromLocalStorage(Keys.AUTH_TOKEN);
  if (!token) return axios.create({ baseURL });

  const defaultHeaders = {
    Authorization: "Bearer " + token,
    ...headers,
  };

  return axios.create({ baseURL, headers, defaultHeaders });
};

export default client;

export const apiList = {
  SIGNIN: "/auth/sign-in",
  SIGNUP: "/auth/create",
  EMPLOYEE_CREATE: "/employee/create",
  GET_EMPLOYEES: "/employee",
  GET_EMPLOYEE_BY_ID: "/employee",
  UPDATE_EMPLOYEE: "/employee",
  DELETE_EMPLOYEE: "/employee",
};
