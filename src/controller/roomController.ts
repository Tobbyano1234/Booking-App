import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import Hotel from "../models/hotelModel";
import {
  errorResponse,
  serverError,
  successResponse,
} from "../utils/helperMethods";
import User from "../models/userModel";
import dotenv from "dotenv";
import Room from "../models/roomModel";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

interface jwtPayload {
  _id: string;
  email: string;
  userId: string;
}

export const CreateRoom = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.token;

    const { _id } = jwt.verify(token, JWT_SECRET) as jwtPayload;

    const userData = await User.findById({ _id });

    if (!userData) {
      errorResponse(res, "Kindly sign in as user", httpStatus.UNAUTHORIZED);
    }

    const newRoom = new Room({ ...req.body, user: _id });
    const record = await newRoom.save();

    return successResponse(
      res,
      "Room profile created successfully",
      httpStatus.CREATED,
      record
    );
  } catch (error) {
    return serverError(res);
  }
};

export const UpdateRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roomData = req.body;
  const { id } = req.params;
  try {
    const record = await Room.findByIdAndUpdate(
      id,
      {
        $set: roomData,
      },
      { new: true }
    );

    return successResponse(
      res,
      "Room profile updated successfully",
      httpStatus.OK,
      record
    );
  } catch (error) {
    return serverError(res);
  }
};

export const DeleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const record = await Room.findByIdAndDelete(id);

    return successResponse(
      res,
      "Room profile deleted successfully",
      httpStatus.OK,
      record
    );
  } catch (error) {
    return serverError(res);
  }
};

export const GetRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const record = await Room.findById(id);

    return successResponse(
      res,
      "Room profile fetched successfully",
      httpStatus.OK,
      record
    );
  } catch (error) {
    return serverError(res);
  }
};

export const GetAllRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const record = await Room.find();

    return successResponse(
      res,
      "All Rooms profiles fetched successfully",
      httpStatus.OK,
      record
    );
  } catch (error) {
    return serverError(res);
  }
};
