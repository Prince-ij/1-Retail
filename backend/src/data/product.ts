import Product from "../models/Product.js";
import type {
  Product as ProductType,
  ProductWithoutId,
} from "../utils/types.js";

const getProducts = async (): Promise<ProductType[]> => {
  const products = await Product.find({});
  return products.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    description: p.description,
    size: p.size,
    price: p.price,
    cost: p.cost,
    supplier: p.supplier,
    stock: p.stock,
  }));
};

const getProductById = async (id: string): Promise<ProductType | null> => {
  const product = await Product.findById(id);
  if (!product) return null;

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

const createProduct = async (
  productData: ProductWithoutId
): Promise<ProductType> => {
  const product = new Product(productData);
  const savedProduct = await product.save();

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
  id: string,
  productData: Partial<ProductWithoutId>
): Promise<ProductType | null> => {
  const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) return null;

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

const deleteProduct = async (id: string): Promise<boolean> => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  return deletedProduct !== null;
};

const updateProductStock = async (
  id: string,
  quantity: number
): Promise<ProductType | null> => {
  const product = await Product.findById(id);
  if (!product) return null;

  product.stock += quantity;
  const updatedProduct = await product.save();

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

const deductProductStock = async (
  id: string,
  quantity: number
): Promise<ProductType | null> => {
  const product = await Product.findById(id);
  if (!product) return null;

  product.stock -= quantity;
  const updatedProduct = await product.save();

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

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
  deductProductStock,
};
