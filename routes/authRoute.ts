import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  loginUserController,
  updateUser,
} from "../controller/userController";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserController);
router.get("/all-users", getAllUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
