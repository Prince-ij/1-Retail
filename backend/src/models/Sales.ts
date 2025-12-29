import mongoose, { Schema } from "mongoose";
import Product from "./Product.js";

const schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  buyer: {
    type: String,
    min: 3,
    max: 20,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  quantity: {
    type: Number,
    min: 1,
    default: 0,
  },
  totalPrice: { type: Number },
  receiptId: { type: String, default: () => crypto.randomUUID(), unique: true },
});

schema.pre("save", async function () {
  const product = await Product.findById(this.product);
  if (product && product.price) {
    this.totalPrice = product.price * this.quantity;
  } else {
    this.totalPrice = 0;
  }
});

export default mongoose.model("Sale", schema);
