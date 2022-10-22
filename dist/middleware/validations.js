"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateResetPassword = exports.validateForgetPassword = exports.validateLoginUser = exports.validateRegisterUser = exports.validateUpdateHotel = exports.validateCreateHotel = void 0;
const utils_1 = require("../utils/utils");
const helperMethods_1 = require("../utils/helperMethods");
const validateCreateHotel = (req, res, next) => {
    const validateHotel = utils_1.createHotelSchema.validate(req.body, utils_1.options);
    if (validateHotel.error) {
        return (0, helperMethods_1.errorResponse)(res, validateHotel.error.details[0].message, 400);
    }
    next();
};
exports.validateCreateHotel = validateCreateHotel;
const validateUpdateHotel = (req, res, next) => {
    const validateHotel = utils_1.updateHotelSchema.validate(req.body, utils_1.options);
    if (validateHotel.error) {
        return (0, helperMethods_1.errorResponse)(res, validateHotel.error.details[0].message, 400);
    }
    next();
};
exports.validateUpdateHotel = validateUpdateHotel;
const validateRegisterUser = (req, res, next) => {
    const validateUser = utils_1.registerUserSchema.validate(req.body, utils_1.options);
    if (validateUser.error) {
        console.log(validateUser.error);
        return (0, helperMethods_1.errorResponse)(res, validateUser.error.details[0].message, 400);
    }
    next();
};
exports.validateRegisterUser = validateRegisterUser;
const validateLoginUser = (req, res, next) => {
    const validateUser = utils_1.loginSchema.validate(req.body, utils_1.options);
    if (validateUser.error) {
        return (0, helperMethods_1.errorResponse)(res, validateUser.error.details[0].message, 400);
    }
    next();
};
exports.validateLoginUser = validateLoginUser;
const validateForgetPassword = (req, res, next) => {
    const validateForgetPassword = utils_1.forgotPasswordSchema.validate(req.body, utils_1.options);
    if (validateForgetPassword.error) {
        return (0, helperMethods_1.errorResponse)(res, validateForgetPassword.error.details[0].message, 400);
    }
    next();
};
exports.validateForgetPassword = validateForgetPassword;
const validateResetPassword = (req, res, next) => {
    const validateResult = utils_1.changePasswordSchema.validate(req.body, utils_1.options);
    if (validateResult.error) {
        return res.status(400).json({
            message: validateResult.error.details[0].message,
        });
    }
    next();
};
exports.validateResetPassword = validateResetPassword;
const validateUpdateUser = (req, res, next) => {
    const validateUser = utils_1.updateUserSchema.validate(req.body, utils_1.options);
    if (validateUser.error) {
        return (0, helperMethods_1.errorResponse)(res, validateUser.error.details[0].message, 400);
    }
    next();
};
exports.validateUpdateUser = validateUpdateUser;
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
