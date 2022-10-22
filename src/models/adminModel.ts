import { Types, Schema, Model } from "mongoose";

export interface AdminAttribute {
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  avatar?: string;
}

const Admin = new Schema<AdminAttribute>({});
