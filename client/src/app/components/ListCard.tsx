"use client";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { Blog, useBlogContext } from "../context/BlogContext";
import moment from "moment";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { getAllUsers } from "../api/user";
import { getBlogs } from "../api/blog";

export type UserType = {
  _id: String;
  username: String;
  email: String;
  password: String;
  imgUrl: String;
};
const ListCard = () => {
  //getting blogs
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  const blogsReversed = blogs
    .slice(0)
    .reverse()
    .map((element) => {
      return element;
    });

  const getAllBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnclick = (blog: any) => {
    router.push(`/posts/${blog._id}`);
  };

  const fetchDataUsers = async () => {
    const res = await getAllUsers();

    setUsers(res.data);
  };
  const getCategoryColor = (category: String) => {
    switch (category) {
      case "Education":
        return "text-red-300";
      case "Tecnology":
        return "text-amber-300";
      case "Sport":
        return "text-green-300";
      case "Fashion":
        return "text-pink-300";
      case "Other":
        return "text-purple-300";
      case "Art":
        return "text-indigo-300";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllBlogs(), await fetchDataUsers();
      setLoading(false);
    };

    fetchData();
    console.log(blogs);
  }, []);

  return (
    <>
      <h1 className="font-bold  mx-20 mt-12 text-center mb-5">All Posts</h1>

      {/*******************Here the new content********************/}
      <div className="cursor-pointer gap-16 grid xl:grid-cols-3 md:grid-cols-2  w-full my-10">
        {blogsReversed.map((blog, index) => (
          <div
            key={index}
            onClick={() => handleOnclick(blog)}
            className="flex flex-col bg-white rounded-2xl gap-5"
          >
            {loading ? (
              <div className="relative h-[300px] flex">
                {" "}
                <Skeleton
                  containerClassName="flex-1"
                  height={300}
                  width={"100%"}
                />
              </div>
            ) : (
              <div className="relative h-[300px]">
                <Image
                  src={blog.imgUrl as string}
                  alt={"blog photo"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            )}

            <div className="flex flex-col text-left p-5">
              <h1 className="text-4xl">
                {loading ? <Skeleton height={40} width={150} /> : blog.title}
              </h1>
              <p className="mt-3">
                {loading ? <Skeleton height={20} width={280} /> : blog.text}
              </p>
              <div className="mt-5">
                {users.map(
                  (userX) =>
                    userX.email === blog.user && (
                      <div key={userX.email as string} className="inline-flex">
                        {userX.imgUrl ? (
                          <div className="relative h-10 w-10">
                            {loading ? (
                              <Skeleton circle width={"100%"} height={"100%"} />
                            ) : (
                              <Image
                                className="rounded-full cursor-none"
                                src={userX.imgUrl as string}
                                alt={"user logo"}
                                layout="fill"
                                objectFit="cover"
                              />
                            )}
                          </div>
                        ) : (
                          <div className="relative h-10 w-10">
                            {loading ? (
                              <Skeleton circle />
                            ) : (
                              <Image
                                className="rounded-full cursor-none"
                                src={"/defaultUser.png"}
                                alt={"user logo"}
                                layout="fill"
                                objectFit="cover"
                              />
                            )}
                          </div>
                        )}
                        <span className="ml-2 mt-2">
                          {loading ? (
                            <Skeleton height={20} width={80} />
                          ) : (
                            userX.username
                          )}{" "}
                        </span>
                      </div>
                    )
                )}
              </div>

              <div className="mt-2">
                {loading ? (
                  <Skeleton height={20} width={300} />
                ) : (
                  <div>
                    {blog.updated ? "Updated" : "Created"}&nbsp;
                    {moment(new Date(blog.date)).fromNow()} - &nbsp;
                    <span className={getCategoryColor(blog.category)}>
                      {blog.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListCard;
