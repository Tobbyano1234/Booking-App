import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("MongoDB Database Connected");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!!!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!!!");
});

export default connectDB;
