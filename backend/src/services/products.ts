import Product from "../models/Product.js";
import type {
  ProductEntryType,
  ProductType,
} from "../schemas/productSchema.js";
import type { UserType } from "../schemas/userSchema.js";

const getProducts = async (user: UserType): Promise<ProductType[]> => {
  const products = await Product.find({ user: user.id });
  return products.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    size: product.size,
    price: product.price,
    cost: product.cost,
    supplier: product.supplier,
    stock: product.stock,
  }));
};

const getProductById = async (id: string): Promise<ProductType> => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found !");
  }
  return {
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    size: product.size,
    price: product.price,
    cost: product.cost,
    supplier: product.supplier,
    stock: product.stock,
  };
};

const newProduct = async (
  user: UserType,
  product: ProductEntryType
): Promise<ProductType> => {
  const newProduct = new Product({
    ...product,
    user: user.id,
    prevStock: product.stock,
  });
  const savedProduct = await newProduct.save();
  return {
    id: savedProduct._id.toString(),
    name: savedProduct.name,
    description: savedProduct.description,
    size: savedProduct.size,
    price: savedProduct.price,
    cost: savedProduct.cost,
    supplier: savedProduct.supplier,
    stock: savedProduct.stock,
  };
};

const updateProduct = async (
  user: UserType,
  product: ProductEntryType
): Promise<ProductType> => {
  const updatedProduct = await Product.findOneAndUpdate(
    { name: product.name },
    { ...product, user: user.id, prevStock: product.stock },
    { new: true }
  );
  return {
    id: updatedProduct._id.toString(),
    name: updatedProduct.name,
    description: updatedProduct.description,
    size: updatedProduct.size,
    price: updatedProduct.price,
    cost: updatedProduct.cost,
    supplier: updatedProduct.supplier,
    stock: updatedProduct.stock,
  };
};

const deleteProduct = async (id: string): Promise<ProductType> => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  return {
    id: deletedProduct._id.toString(),
    name: deletedProduct.name,
    description: deletedProduct.description,
    size: deletedProduct.size,
    price: deletedProduct.price,
    cost: deletedProduct.cost,
    supplier: deletedProduct.supplier,
    stock: deletedProduct.stock,
  };
};

export default {
  getProducts,
  getProductById,
  newProduct,
  updateProduct,
  deleteProduct,
};
