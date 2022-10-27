import express from "express";
import { auth } from "../middleware/auth";
import { adminAuth } from "../middleware/adminAuth";
import {
  CreateRoom,
  DeleteRoom,
  GetAllRooms,
  GetRoom,
  UpdateRoom,
} from "../controller/roomController";

const router = express.Router();

router.post("/add", auth, CreateRoom);
router.put("/update/:id", auth, UpdateRoom);
router.delete("/delete/:id", auth, DeleteRoom);
router.get("/get-hotel/:id", auth, GetRoom);
router.get("/all-hotel", adminAuth, GetAllRooms);

export default router;
