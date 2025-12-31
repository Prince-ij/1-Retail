import mongoose, { Schema } from "mongoose";
import Product from "./Product.js";

const schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  buyer: {
    type: String,
    min: 3,
    max: 20,
    required: true,
  },
  date: { type: Date, default: Date.now },
  quantity: {
    type: Number,
    min: 1,
    default: 1,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
  totalDebt: Number,
  status: {
    type: String,
    enum: ["settled", "pending"],
    default: "pending",
  },
  receiptId: { type: String, default: () => crypto.randomUUID(), unique: true },
});

schema.pre("save", async function () {
  const product = await Product.findById(this.product);
  if (product && product.price) {
    this.totalDebt = product.price * this.quantity - this.amountPaid;
  } else {
    this.totalDebt = 0;
  }
});

export default mongoose.model("Credit", schema);
