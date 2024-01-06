import mongoose, { Schema, Types } from "mongoose";

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
}

// Declare the Schema of the Mongo model
const userSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Export the model
const User = mongoose.model<IUser>("User", userSchema);
export default User;
