import supertest from "supertest";
import app from "../app.js";
import { test, after, before } from "node:test";
import assert from "node:assert";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config();

const api = supertest(app);

before(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI);
  await User.deleteMany({});
});

const test_user = {
  details: {
    firstName: "Zarabozo",
    lastName: "Dimitriv",
    email: "princeij56@gmail.com",
  },
  password: "woohoo123",
};

// User registers succeeds
test("User Registers successfully", async () => {
  await api
    .post("/api/users")
    .send(test_user)
    .expect(201)
    .expect("Content-Type", /application\/json/);
});

// User verification succeeds
test("User is verified", async () => {
  const user = await User.findOne({
    "details.email": "princeij56@gmail.com",
  });

  const id = user._id;
  const token = user.verificationToken;
  await api.get(`/api/users/verify-email/${id}/${token}`).expect(200);
});

// user login succeeds
test("User login succeeds with correct credentials", async () => {
  await api
    .post("/api/users/login")
    .send({ email: "princeij56@gmail.com", password: "woohoo123" })
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

// user login fails with wrong  credentials
test("User login fails with wrong credentials", async () => {
  await api
    .post("/api/users/login")
    .send({ email: "princeij56@gmail.com", password: "hoo123" })
    .expect(400);
});
// user reset password succeeds
test("User reset password succeeds", async () => {
  let user = await User.findOne({
    "details.email": "princeij56@gmail.com",
  });
  await api.get(`/api/users/reset-link/${user._id}`);

  user = await User.findById(user._id);
  const password = "Iamchanged247";
  await api
    .post("/api/users/reset")
    .send({
      email: "princeij56@gmail.com",
      password: password,
      token: user.verificationToken,
    })
    .expect(200);

  const finalUser = await User.findById(user._id);

  const passwordMatches = await finalUser.checkPassword(password);
  assert.strictEqual(passwordMatches, true);
});

after(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
