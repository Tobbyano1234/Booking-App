import Joi from "joi";
import jwt from "jsonwebtoken";

export const createHotelSchema = Joi.object({
  name: Joi.string().max(255).required(),
  type: Joi.string().max(255).required(),
  city: Joi.string().max(255).required(),
  address: Joi.string().max(255).required(),
  distance: Joi.string().max(255).required(),
  photos: Joi.string().max(255),
  title: Joi.string().max(255).required(),
  description: Joi.string().max(255).required(),
  rooms: Joi.string().max(255),
  cheapestPrice: Joi.string().max(255).required(),
  featured: Joi.boolean().default(false),
});

export const updateHotelSchema = Joi.object({
  name: Joi.string().max(255).required(),
  type: Joi.string().max(255).required(),
  city: Joi.string().max(255).required(),
  address: Joi.string().max(255).required(),
  distance: Joi.string().max(255).required(),
  photos: Joi.string().max(255),
  title: Joi.string().max(255).required(),
  description: Joi.string().max(255).required(),
  rooms: Joi.string().max(255),
  cheapestPrice: Joi.string().max(255).required(),
});

export const registerUserSchema = Joi.object({
  fullName: Joi.string().required(),
  userName: Joi.string().lowercase().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirmPassword: Joi.ref("password"),
  avatar: Joi.string(),
  isAdmin: Joi.boolean().default(false),
  isVerified: Joi.boolean().default(false),
}).with("password", "confirmPassword");

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().trim().lowercase(),
  userName: Joi.string().trim().lowercase(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().trim().lowercase().required(),
});

export const changePasswordSchema = Joi.object()
  .keys({
    password: Joi.string().required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  })
  .with("password", "confirmPassword");

export const generateLoginToken = (user: {
  [key: string]: unknown;
}): string => {
  const pass = process.env.JWT_SECRET as string;
  return jwt.sign(user, pass, { expiresIn: "1d" });
};

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
