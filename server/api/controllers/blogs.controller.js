import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

export const getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

export const createBlog = async (req, res) => {
  const { title, text, date, category, imgUrl, user } = req.body;
  const newBlog = new Blog({
    title,
    text,
    date,
    category,
    imgUrl,
    user,
  });
  console.log(imgUrl);
  const blogSaved = await newBlog.save();
  res.json(blogSaved);
};
export const getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.blogId);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
};
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.blogId);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
};

export const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.blogId, req.body, {
    new: true,
  });
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
};
export const createComment = async (req, res) => {
  try {
    const { content, userEmail, blogId } = req.body;
    const newComment = new Comment({
      content,
      user: userEmail,
      blog: blogId,
    });
    //searching a blog
    const blogFounded = await Blog.findById(blogId);
    if (!blogFounded)
      return res.status(404).json({ message: "Blog not found" });
    //searching a user
    const userFound = await User.findOne({ email: userEmail });
    if (!userFound) return res.status(404).json({ message: "User not found" });
    //saving a comment

    const commentSaved = await newComment.save();
    res.json(commentSaved);
  } catch (error) {
    console.log(error);
  }
};
export const getComments = async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
};

export const getCommentsByBlog = async (req, res) => {
  const comments = await Comment.find({ blog: req.params.blogId });
  res.json(comments);
};
