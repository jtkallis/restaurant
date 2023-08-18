import { Schema, model } from "mongoose";

const userSchema = new Schema({
      firstName: {
        type: String,
        required: [true, 'firstName field is required'],
      },
      lastName: {
        type: String,
        required: [true, 'lastName field is required'],
      },
      userName: {
        type: String,
        required: [true, 'userName field is required'],
      },
      email: {
        type: String,
        required: [true, 'email field is required'],
      },
      password: {
        type: String,
        required: [true, 'password field is required'],
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },{ timestamps: true },
  );
export default model("User", userSchema);