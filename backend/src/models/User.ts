import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    details: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
    },
    password: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    sales: [{ type: Schema.Types.ObjectId, ref: "Sale" }],
    credits: [{ type: Schema.Types.ObjectId, ref: "Credits" }],
  },
  {
    methods: {
      async checkPassword(password: string) {
        return await bcrypt.compare(this.password, password);
      },
    },
  }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (!this.password) throw new Error("Password is required");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", UserSchema);
