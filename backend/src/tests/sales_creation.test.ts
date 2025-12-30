import supertest from "supertest";
import app from "../app.js";
import { before, after, test } from "node:test";
import Sales from "../models/Sales.js";
import assert from "node:assert";
import { createProducts, createUser, loginUser } from "./helper.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import User from "../models/User.js";
dotenv.config();

const api = supertest(app);
let token: string;
let product_ids: string[];

before(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI);
  await User.deleteMany({});
  await Product.deleteMany({});
  await Sales.deleteMany({});
  await createUser();
  token = await loginUser();
  product_ids = await createProducts();
});

// made sale successful
test("made sale successfully", async () => {
  const test_sale = {
    product: product_ids[1],
    buyer: "Musa Bala",
    quantity: 15,
  };

  await api
    .post("/api/sales")
    .auth(token, { type: "bearer" })
    .send(test_sale)
    .expect(201);
});

// correct sale successful
test("sales corrected successfully", async () => {
  const corrected_sale = {
    product: product_ids[1],
    buyer: "Musa Bala",
    quantity: 10,
  };

  const initial_sale = await Sales.findOne({ buyer: "musa bala" });

  await api
    .put(`/api/sales/${initial_sale._id}`)
    .auth(token, { type: "bearer" })
    .send(corrected_sale)
    .expect(200);

  const sale = await Sales.findOne({ buyer: "musa bala" });

  assert.strictEqual(sale.quantity, 10);
});
// sale when out of stock fails
test("sale when out of stock fails", async () => {
  const test_sale1 = {
    product: product_ids[0],
    buyer: "Isma'il Sani",
    quantity: 40,
  };
  const test_sale2 = {
    product: product_ids[0],
    buyer: "buba bakar",
    quantity: 30,
  };
  await api
    .post("/api/sales")
    .auth(token, { type: "bearer" })
    .send(test_sale1)
    .expect(201);

  await api
    .post("/api/sales")
    .auth(token, { type: "bearer" })
    .send(test_sale2)
    .expect(400);
});
// returned correct total profit
test("returned correct profit ", async () => {
  const res = await api
    .get(`/api/sales/profit/${new Date().toISOString().split("T")[0]}`)
    .auth(token, { type: "bearer" })
    .expect(200);

  assert.strictEqual(res.body, 90000);
});

// returned correct total sales
test("returned correct total sales", async () => {
  const res = await api
    .get(`/api/sales/total/${new Date().toISOString().split("T")[0]}`)
    .auth(token, { type: "bearer" })
  .expect(200);

  assert.strictEqual(res.body, 2);
});

after(async () => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await Sales.deleteMany({});
  await mongoose.connection.close();
});
