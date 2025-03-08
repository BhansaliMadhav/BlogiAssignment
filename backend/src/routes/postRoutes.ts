import express from "express";
import {
  getAllPosts,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/user", authenticateUser, getUserPosts);
router.post("/", authenticateUser, createPost);
router.put("/:id", authenticateUser, updatePost);
router.delete("/:id", authenticateUser, deletePost);

export default router;
