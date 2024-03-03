import Blog from "../models/blog.model.js"
import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"

export const getBlogs = async (req, res) => {
	const blogs = await Blog.find()
	res.json(blogs)
}
export const createBlog = async (req, res) => {
	const { title, text, date, category, imgUrl, userId } = req.body
	const newBlog = new Blog({
		title,
		text,
		date,
		category,
		imgUrl,
		user: userId,
	})
	console.log(imgUrl)
	const blogSaved = await newBlog.save()
	res.json(blogSaved)
}
export const getBlog = async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	if (!blog) return res.status(404).json({ message: "Blog not found" })
	res.json(blog)
}
export const deleteBlog = async (req, res) => {
	const blog = await Blog.findByIdAndDelete(req.params.id)
	if (!blog) return res.status(404).json({ message: "Blog not found" })
	res.json(blog)
}

export const updateBlog = async (req, res) => {
	const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
	if (!blog) return res.status(404).json({ message: "Blog not found" })
	res.json(blog)
}
export const createComment = async (req, res) => {
	const { content, userId, blogId } = req.body
	const newComment = new Comment({
		content,
		user: userId,
		blog: blogId,
	})
	//searching a blog
	const blogFounded = await Blog.findById(blogId)
	if (!blogFounded) return res.status(404).json({ message: "Blog not found" })
	//searching a user
	const userFound = await User.findById(userId)
	if (!userFound) return res.status(404).json({ message: "User not found" })
	//saving a comment
	try {
		newComment.save()
		res.json(newComment)
	} catch (error) {
		console.log(error)
	}
}
export const getComments = async (req, res) => {
	const comments = await Comment.find()
	res.json(comments)
}

export const getCommentsByBlog = async (req, res) => {
	const comments = await Comment.find({ blog: req.params.blogId })
	res.json(comments)
}
