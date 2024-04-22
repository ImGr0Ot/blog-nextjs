"use client";
import { createContext, useState, useContext } from "react";
import { getBlogs } from "../api/blog";

export type Blog = {
  title: String;
  text: String;
  imgUrl: String;
  category: String;
  date: Date;
  user: String;
  updated: Boolean;
};
type blogContextType = {
  blogs: Blog[];
  getAllBlogs: () => void;
};
type Props = {
  children: React.ReactNode;
};
const BlogContextDefaultValues: blogContextType = {
  getAllBlogs: () => {},
  blogs: [],
};

const BlogContext = createContext<blogContextType>(BlogContextDefaultValues);

export function useBlogContext() {
  return useContext(BlogContext);
}
export function BlogProvider({ children }: Props) {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getAllBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const value = { blogs, getAllBlogs };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}
