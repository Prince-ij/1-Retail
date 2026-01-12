import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL + "/credits";
import type { DebtType, DebtEntryType } from "../types";

const token = `Bearer ${localStorage.getItem("token")}`;

const config = {
  headers: { Authorization: token },
};

const getDebts = async () => {
  const res = await axios.get<DebtType[]>(baseUrl, config);
  return res.data;
};

const getDebt = async (id: string | undefined) => {
  const res = await axios.get<DebtType>(`${baseUrl}/unique/${id}`, config);
  return res.data;
};

const createDebt = async (debt: DebtEntryType) => {
  const res = await axios.post<DebtType>(baseUrl, debt, config);
  return res.data;
};

const correctDebt = async (debt: DebtEntryType, id: string) => {
  const res = await axios.put<DebtType>(`${baseUrl}/${id}`, debt, config);
  return res.data;
};

const getTotalDebtAmount = async () => {
  const res = await axios.get<number>(`${baseUrl}/total`, config);
  return res.data;
};

const getDebtsByDate = async (date: string) => {
  const res = await axios.get<DebtType[]>(`${baseUrl}/${date}`, config);
  return res.data;
};

const getDebtsByBuyer = async (name: string) => {
  const res = await axios.get<DebtType[]>(`${baseUrl}/buyer/${name}`, config);
  return res.data;
};

const payPartDebt = async (id: string, amount: number) => {
  const res = await axios.post(
    `${baseUrl}/pay`,
    { id, amount },
    config
  );
  return res.data;
};

export default {
  getDebts,
  getDebt,
  createDebt,
  correctDebt,
  getTotalDebtAmount,
  getDebtsByBuyer,
  getDebtsByDate,
  payPartDebt,
};
