import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL + "/sales";
import type { SalesEntryType, SalesType } from "../types";

const token = `Bearer ${localStorage.getItem("token")}`;

const config = {
  headers: { Authorization: token },
};

const getSales = async () => {
  const res = await axios.get<SalesType[]>(baseUrl, config);
  return res.data;
};

const createSale = async (sale: SalesEntryType) => {
  const res = await axios.post<SalesType>(baseUrl, sale, config);
  return res.data;
};

const correctSale = async (sale: SalesEntryType, id: string) => {
  const res = await axios.put(`${baseUrl}/${id}`, sale, config);
  return res.data;
};

const getProfitByDate = async (date: string) => {
  const res = await axios.get<number>(`${baseUrl}/profit/${date}`, config);
  return res.data;
};

const getSalesByDate = async (date: string) => {
  const res = await axios.get<SalesType[]>(`${baseUrl}/${date}`, config);
  return res.data;
};

const getTotalSalesByDate = async (date: string) => {
  const res = await axios.get<number>(`${baseUrl}/total/${date}`, config);
  return res.data;
};

const getSalesByBuyer = async (name: string) => {
  const res = await axios.get<number>(`${baseUrl}/buyer/${name}`, config);
  return res.data;
};

const getSalesByProduct = async (name: string) => {
  const res = await axios.get<SalesType[]>(
    `${baseUrl}/product/${name}`,
    config
  );
  return res.data;
};

export default {
  getSales,
  createSale,
  correctSale,
  getProfitByDate,
  getSalesByBuyer,
  getSalesByDate,
  getTotalSalesByDate,
  getSalesByProduct,
};
