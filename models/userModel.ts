import mongoose, { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

// Check if mongoose is doing queries
mongoose.set("debug", true);

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  role: string;
  password: string;
}

interface IUserMethods {
  isPasswordMatched(enteredPaasword: string): any;
}

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, {}, IUserMethods>;

// Declare the Schema of the Mongo model
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
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
  role: { type: String, default: "user" },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.method(
  "isPasswordMatched",
  async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
);

//Export the model
const User = model<IUser, UserModel>("User", userSchema);
export default User;

// ,
//   {
//     methods: {
//       isPasswordMatched: async function (enteredPassword: string) {
//         return await bcrypt.compare(enteredPassword, this.password);
//       },
//     },
//   }
