import supertest from "supertest";
import app from "../app.js";
import { before, after, test } from "node:test";
import User from "../models/User.js";
import assert from "node:assert";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import { createUser, loginUser } from "./helper.js";

const api = supertest(app);
let token: string;

before(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI);
  await User.deleteMany({});
  await Product.deleteMany({});
  await createUser();
  token = await loginUser();
});

const newProduct = {
  name: "flour",
  description: "one bag of flour",
  size: "small",
  price: 13000,
  cost: 8500,
  supplier: "Sempene Stores",
  stock: 100,
};

// product creation succeeds

test("create new product successful", async () => {
  await api
    .post("/api/products")
    .send(newProduct)
    .auth(token, { type: "bearer" })
    .expect(201);
});

// duplicate product name fails
test("duplicate product name fails", async () => {
  const duplicateProduct = {
    name: "flour",
    description: "one bag of flour",
    size: "small",
    price: 13000,
    cost: 8500,
    supplier: "Sempene Stores",
    stock: 100,
  };
  await api
    .post("/api/products")
    .send(duplicateProduct)
    .auth(token, { type: "bearer" })
    .expect(400);
});

// product deletion succeeds
test("product deletion successful", async () => {
  const product = await Product.findOne({ name: "flour" });
  await api
    .delete(`/api/products/${product.name}`)
    .auth(token, { type: "bearer" })
    .expect(204);
  const productSearch = await Product.findOne({ name: "flour" });

  assert.strictEqual(productSearch, null);
});

// product update succeeds

test("update of product succeeds", async () => {
  const updatedProduct = {
    name: "flour",
    description: "one bag of flour",
    size: "small",
    price: 13000,
    cost: 8500,
    supplier: "Kakula Stores",
    stock: 500,
  };

  await api
    .post("/api/products")
    .send(newProduct)
    .auth(token, { type: "bearer" })
    .expect(201);

  const initialProduct = await Product.findOne({ name: "flour" });

  await api
    .put("/api/products")
    .send(updatedProduct)
    .auth(token, { type: "bearer" })
    .expect(200);

  const finalProduct = await Product.findOne({ name: "flour" });

  assert.strictEqual(initialProduct.stock, 100);
  assert.strictEqual(finalProduct.stock, 500);
});

// product without name fails
test("create product without name fails", async () => {
  const productWithNoName = {
    description: "one bag of flour",
    size: "small",
    price: 13000,
    cost: 8500,
    supplier: "Sempene Stores",
    stock: 100,
  };
  await api
    .post("/api/products")
    .send(productWithNoName)
    .auth(token, { type: "bearer" })
    .expect(400);
});
// product without price fails
test("create product with no price fails", async () => {
  const productWithNoPrice = {
    name: "millet",
    description: "one bag of flour",
    size: "small",
    cost: 8500,
    supplier: "Sempene Stores",
    stock: 100,
  };
  await api
    .post("/api/products")
    .send(productWithNoPrice)
    .auth(token, { type: "bearer" })
    .expect(400);
});

after(async () => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await mongoose.connection.close();
});
