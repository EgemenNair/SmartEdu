import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

interface IUser {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next: Function) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

export const User: mongoose.Model<IUser> = mongoose.model("User", UserSchema);
