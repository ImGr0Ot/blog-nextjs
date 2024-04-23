import axios from "axios";
import { Blog } from "../context/BlogContext";

export const BEUrl = process.env.API_URL || "http://localhost:4000/";

export const getBlogs = async () => await axios.get(`${BEUrl}blogs`);
export const getBlog = async (blogId: string) =>
  await axios.get(`${BEUrl}blog/${blogId}`);
export const deleteBlog = async (blogId: string) =>
  await axios.delete(`${BEUrl}blogs/${blogId}`);
export const getBlogsByCategory = async (category: string) =>
  await axios.get(`${BEUrl}blogs/${category}`);
export const updateBlog = async (blog: Blog, blogId: string) => {
  try {
    if (blog.imgUrl === "") {
      if (blog.category === "") {
        const newBlog = {
          title: blog.title,
          user: blog.user,
          text: blog.text,
          date: blog.date,
          updated: blog.updated,
        };
        await axios.put(`${BEUrl}blog/${blogId}`, newBlog);
      } else {
        const newBlog = {
          title: blog.title,
          category: blog.category,
          user: blog.user,
          text: blog.text,
          date: blog.date,
          updated: blog.updated,
        };
        await axios.put(`${BEUrl}blog/${blogId}`, newBlog);
      }
    } else {
      if (blog.category === "") {
        const newBlog = {
          title: blog.title,
          user: blog.user,
          text: blog.text,
          imgUrl: blog.imgUrl,
          date: blog.date,
          updated: blog.updated,
        };
        await axios.put(`${BEUrl}blog/${blogId}`, newBlog);
      } else {
        await axios.put(`${BEUrl}blog/${blogId}`, blog);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//create a blog
export const blogRequest = async (blog: any) => {
  try {
    await axios.post(`${BEUrl}blogs`, blog);
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (blogId: string) =>
  await axios.get(`${BEUrl}comments/${blogId}`);

export const commentRequest = async (comment: any) =>
  await axios.post(`${BEUrl}comment`, comment);
