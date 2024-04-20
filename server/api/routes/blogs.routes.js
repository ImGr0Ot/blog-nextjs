import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  createComment,
  getCommentsByBlog,
  getBlogsByCategories,
} from "../controllers/blogs.controller.js";

const router = Router();

router.get("/blogs", getBlogs);

router.post("/blogs", createBlog);

router.put("/blog/:blogId", updateBlog);

router.delete("/blogs/:blogId", deleteBlog);

router.post("/comment", createComment);

router.get("/comments/:blogId", getCommentsByBlog);

export default router;
