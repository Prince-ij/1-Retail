import mongoose, { Schema, Document } from "mongoose";
import Product from "./Product.js";

interface ICredit extends Document {
  product: mongoose.Types.ObjectId;
  buyer: string;
  date: Date;
  quantity: number;
  amountPaid: number;
  totalDebt: number;
  status: "settled" | "pending";
  receiptId: string;
}

const schema = new Schema<ICredit>({
  product: { type: Schema.Types.ObjectId, ref: "Products" },
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

schema.set("toJSON", {
  transform: function (_doc, returnedObject) {
    const obj = returnedObject as unknown as Record<string, unknown>;
    obj["id"] = obj["_id"];
    delete obj["_id"];
    delete obj["__v"];
    return obj;
  },
});

export default mongoose.model<ICredit>("Credit", schema);
