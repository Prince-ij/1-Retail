import supertest from "supertest";
import app from "../app.js";
import { before, after, test } from "node:test";
import Credit from "../models/Credit.js";
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
  await Credit.deleteMany({});
  await createUser();
  token = await loginUser();
  product_ids = await createProducts();
});

// create debt successful
test("made debt successfully", async () => {
  const testDebt = {
    product: product_ids[1],
    buyer: "Musa Bala",
    quantity: 15,
  };

  await api
    .post("/api/credits")
    .auth(token, { type: "bearer" })
    .send(testDebt)
    .expect(201);
});

// paid half of debt successful
test("part payment of debt succeeds", async () => {
  const initialDebt = await Credit.findOne({ buyer: "musa bala" });
  const partPayment = {
    id: initialDebt._id,
    amount: 100000,
  };

  await api
    .post("/api/credits/pay")
    .send(partPayment)
    .auth(token, { type: "bearer" })
    .expect(200);

  const finalDebt = await Credit.findOne({ buyer: "musa bala" });
  assert.strictEqual(
    finalDebt.totalDebt,
    initialDebt.totalDebt - partPayment.amount
  );
});

// correct debt successful
test("correct debt successful", async () => {
  const initialDebt = await Credit.findOne({ buyer: "musa bala" });

  const correctedDebt = {
    product: product_ids[1],
    buyer: "Musa Bala",
    quantity: 10,
  };

  await api
    .put(`/api/credits/${initialDebt._id}`)
    .auth(token, { type: "bearer" })
    .send(correctedDebt)
    .expect(200);

  const finalDebt = await Credit.findOne({ buyer: "musa bala" });
  assert.strictEqual(finalDebt.totalDebt, 0);
});

// returned correct totaldebt amount
test("returned correct total debt", async () => {
  const testDebt1 = {
    product: product_ids[0],
    buyer: "isah sale",
    quantity: 16,
  };
  const testDebt2 = {
    product: product_ids[0],
    buyer: "musa bashir",
    quantity: 16,
  };

  await api
    .post("/api/credits")
    .auth(token, { type: "bearer" })
    .send(testDebt1)
    .expect(201);

  await api
    .post("/api/credits")
    .auth(token, { type: "bearer" })
    .send(testDebt2)
    .expect(201);

  const total = await api
    .get("/api/credits/total")
    .auth(token, { type: "bearer" })
    .expect(200);

  assert.strictEqual(total.body, 80000);
});

// overpayment fails
test("overpayment fails", async () => {
  const debt = await Credit.findOne({ buyer: "isah sale" });
  const partPayment = {
    id: debt._id,
    amount: 100000,
  };

  await api
    .post("/api/credits/pay")
    .send(partPayment)
    .auth(token, { type: "bearer" })
    .expect(400);
});

// settle debt successful
test("settle debt successful", async () => {
  const initialDebt = await Credit.findOne({ buyer: "isah sale" });
  const partPayment = {
    id: initialDebt._id,
    amount: 40000,
  };

  await api
    .post("/api/credits/pay")
    .send(partPayment)
    .auth(token, { type: "bearer" })
    .expect(200);

  const finalDebt = await Credit.findOne({ buyer: "isah sale" });
  assert.strictEqual(finalDebt.status, "settled");
});
// pay settled debt failed
test("pay settled debt failed", async () => {
  const initialDebt = await Credit.findOne({ buyer: "isah sale" });
  const partPayment = {
    id: initialDebt._id,
    amount: 100000,
  };

  await api
    .post("/api/credits/pay")
    .send(partPayment)
    .auth(token, { type: "bearer" })
    .expect(400);
});

after(async () => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await Credit.deleteMany({});
  await mongoose.connection.close();
});
