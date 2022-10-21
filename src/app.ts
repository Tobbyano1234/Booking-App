import express from "express";
import createError from "http-errors";
// import dotenv from "dotenv";
import connectDB from "./config/db.config";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import hotelRouter from "./routes/hotelRoute";
import userRouter from "./routes/userRoute";

// dotenv.config();

require("dotenv").config();

connectDB();

const PORT = process.env.PORT;
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", hotelRouter);

// catch 404 and forward to error handler

app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;
