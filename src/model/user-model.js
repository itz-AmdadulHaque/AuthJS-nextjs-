import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {       // requred false because we are also using OAuth provider
    type: String,
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
  },
  authProviderId: {
    type: String,
  },
});

export const User = mongoose.models?.User ?? mongoose.model("User", userSchema);
