import { Router } from "express"
import {
	createBlog,
	deleteBlog,
	getBlog,
	getBlogs,
	updateBlog,
	createComment,
	getCommentsByBlog,
} from "../controllers/blogs.controller.js"

const router = Router()

router.get("/blogs", getBlogs)

router.post("/blogs", createBlog)

router.get("/blog/:id", getBlog)

router.put("/blogs/:id", updateBlog)

router.delete("/blogs/:id", deleteBlog)

router.post("/comment", createComment)

router.get("/comments/:blogId", getCommentsByBlog)

export default router
