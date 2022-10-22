import {
  createHotelSchema,
  registerUserSchema,
  loginSchema,
  options,
  updateHotelSchema,
  forgotPasswordSchema,
  changePasswordSchema,
  updateUserSchema,
} from "../utils/utils";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/helperMethods";

export const validateCreateHotel = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateHotel = createHotelSchema.validate(req.body, options);
  if (validateHotel.error) {
    return errorResponse(res, validateHotel.error.details[0].message, 400);
  }
  next();
};

export const validateUpdateHotel = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateHotel = updateHotelSchema.validate(req.body, options);
  if (validateHotel.error) {
    return errorResponse(res, validateHotel.error.details[0].message, 400);
  }
  next();
};

export const validateRegisterUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateUser = registerUserSchema.validate(req.body, options);
  if (validateUser.error) {
    console.log(validateUser.error);
    return errorResponse(res, validateUser.error.details[0].message, 400);
  }
  next();
};

export const validateLoginUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateUser = loginSchema.validate(req.body, options);
  if (validateUser.error) {
    return errorResponse(res, validateUser.error.details[0].message, 400);
  }
  next();
};

export const validateForgetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateForgetPassword = forgotPasswordSchema.validate(
    req.body,
    options
  );
  if (validateForgetPassword.error) {
    return errorResponse(
      res,
      validateForgetPassword.error.details[0].message,
      400
    );
  }
  next();
};

export const validateResetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateResult = changePasswordSchema.validate(req.body, options);
  if (validateResult.error) {
    return res.status(400).json({
      message: validateResult.error.details[0].message,
    });
  }
  next();
};

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateUser = updateUserSchema.validate(req.body, options);
  if (validateUser.error) {
    return errorResponse(res, validateUser.error.details[0].message, 400);
  }
  next();
};

// // maxprofit function?
// function maxProfit(price, k) {
//   // check for the availability of at least two prices and 1 transaction
//   if ((k = 0 || price.length < 1)) return 0;

//   // Initialize the profit;
//   let profit = 0;

//   //Create count for each cycle of transaction
//   for (let t = 1; t <= k; t++) {
//     for (let i = 0; i < price.length; i++) {
//       // Find the day's Minimal by comparing present element to the next element
//       if (price[i + 1] <= price[i]) i++;
//       // When you find the first minimal then Find another day's Maximal
//       else
//         for (let j = i + 1; j <= price.length; j++) {
//           // The day you find a higher price than you bought is the day at which the stock should be sold
//           if (price[j] > price[i]) {
//             let curr_profit = price[j] - price[i] + maxProfit(price, t + 1);

//             // Update the maximum profit so far
//             profit = Math.max(profit, curr_profit);
//           }
//         }
//     }
//   }
//   let profitArr = [profit];
//   // Update the profit so far
//   return profitArr;
// }

// function solution(A) {
//   var profits = [];
//   var max = 0;
//   var bestProfit = 0;
//   for (var i = 0; i < A.length - 1; i++) {
//     var current = A[i];
//     var next = A[i + 1];
//     var difference = next - current;
//     profits.push(difference);
//   }
//   for (var p of profits) {
//     max = Math.max(0, max + p);
//     bestProfit = Math.max(bestProfit, max);
//   }
//   if (bestProfit < 0) return 0;
//   return bestProfit;
// }

// console.log(solution([-1, 9, 0, 8, -5, 6, -24]));
