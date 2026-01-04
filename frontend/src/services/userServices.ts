import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL + "/users";
import type { UserEntryType, UserType } from "../types";

const getUser = async (id: string): Promise<UserType> => {
  const res = await axios.get<UserType>(`${baseUrl}/${id}`);
  return res.data;
};

const createUser = async (user: UserEntryType): Promise<UserType> => {
  const res = await axios.post<UserType>(baseUrl, user);
  return res.data;
};

interface LoginEntry {
  email: string;
  password: string;
}

const loginUser = async (credentials: LoginEntry) => {
  const res = await axios.post(`${baseUrl}/login`, credentials);
  return res.data;
};

interface resetEntry {
  email: string | undefined;
  password: string;
  token: string | undefined;
}

const resetPassword = async (credentials: resetEntry) => {
  const res = await axios.post(`${baseUrl}/reset`, credentials);
  return res.data;
};
const getResetLink = async (email: string) => {
  const res = await axios.get(`${baseUrl}/reset-link/${email}`);
  return res.data;
};
const verifyEmail = async (
  id: string | undefined,
  token: string | undefined
) => {
  const res = await axios.get(`${baseUrl}/verify-email/${id}/${token}`);
  return res.data;
};
export default {
  getUser,
  createUser,
  resetPassword,
  loginUser,
  getResetLink,
  verifyEmail,
};
