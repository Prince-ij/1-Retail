import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  details: { firstName: string; lastName: string; email: string };
  password: string;
  products: mongoose.Types.ObjectId[];
  sales: mongoose.Types.ObjectId[];
  credits: mongoose.Types.ObjectId[];
  checkPassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  details: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
  },
  password: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  sales: [{ type: Schema.Types.ObjectId, ref: "Sale" }],
  credits: [{ type: Schema.Types.ObjectId, ref: "Credits" }],
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (!this.password) throw new Error("Password is required");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods["checkPassword"] = function (
  password: string
): Promise<boolean> {
  const userPassword = this["password"] as string;
  if (!userPassword || typeof userPassword !== "string")
    return Promise.resolve(false);
  return bcrypt.compare(password, userPassword);
};

UserSchema.set("toJSON", {
  transform: function (_doc, ret) {
    const obj = ret as unknown as Record<string, unknown>;
    obj["id"] = obj["_id"];
    delete obj["_id"];
    delete obj["__v"];
    delete obj["password"];
    return obj;
  },
});

export default mongoose.model<IUser>("User", UserSchema);
