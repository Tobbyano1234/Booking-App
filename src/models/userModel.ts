import { Types, model, Schema } from "mongoose";

interface UserAttribute {
  userId: Schema.Types.ObjectId;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
}

const UserSchema = new Schema<UserAttribute>(
  {
    userId: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<UserAttribute>("User", UserSchema);

export default User;
