import { Response } from "express";
import httpStatus from "http-status";

export const serverError = (res: Response) => {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong, try again later",
  });
};

export const errorResponse = (res: Response, message: string, code: number) => {
  return res.status(code).json({
    success: false,
    message,
  });
};

export const successResponse = (
  res: Response,
  message: string,
  code: number,
  data: unknown
) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};
