import express from "express";
import {
  CreateHotel,
  DeleteHotel,
  GetAllHotels,
  GetHotel,
  UpdateHotel,
} from "../controller/hotelController";
import { auth } from "../middleware/auth";
import { adminAuth } from "../middleware/adminAuth";

const router = express.Router();

router.post("/add", auth, CreateHotel);
router.put("/update/:id", auth, UpdateHotel);
router.delete("/delete/:id", auth, DeleteHotel);
router.get("/get-hotel/:id", auth, GetHotel);
router.get("/all-hotel", adminAuth, GetAllHotels);

export default router;
