import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL + "/products";
import type { ProductEntryType, ProductType } from "../types";

const token = `Bearer ${localStorage.getItem("token")}`;

const config = {
  headers: { Authorization: token },
};

const getProducts = async () => {
  const res = await axios.get<ProductType[]>(baseUrl, config);
  return res.data;
};

const getProductById = async (id: string | undefined) => {
  const res = await axios.get<ProductType>(`${baseUrl}/${id}`, config);
  return res.data;
};

const createProduct = async (product: ProductEntryType) => {
  const res = await axios.post<ProductType>(baseUrl, product, config);
  return res.data;
};

const updateProduct = async (product: ProductEntryType) => {
  const res = await axios.put<ProductType>(baseUrl, product, config);
  return res.data;
};
const deleteProductById = async (id: string | undefined) => {
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
};
