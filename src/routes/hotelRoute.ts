import express from "express";
import {
  CreateHotel,
  DeleteHotel,
  GetAllHotels,
  GetHotel,
  UpdateHotel,
} from "../controller/hotelController";

const router = express.Router();

router.post("/add", CreateHotel);
router.put("/update/:id", UpdateHotel);
router.delete("/delete/:id", DeleteHotel);
router.get("/get-hotel/:id", GetHotel);
router.get("/all-hotel", GetAllHotels);

export default router;
