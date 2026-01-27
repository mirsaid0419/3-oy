import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  chat_id: { type: Number },
  name: { type: String },
  contact: { type: String },
  role: {
    type: String,
    enum: ["SUPERADMIN", "ADMIN", "USER"],
    default: "USER",
  },
  region: { type: String },
  step: {
    type: String,
    enum: ["start", "name","region", "contact"],
    default: "start",
  },
});

const User= model("users", UserSchema);
export {User}