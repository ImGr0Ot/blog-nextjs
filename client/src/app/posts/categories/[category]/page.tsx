"use client";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/navigation";
import { getAllUsers } from "@/app/api/user";
import { getBlogsByCategory } from "@/app/api/blog";
import { Blog } from "@/app/context/BlogContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export type UserType = {
  _id: String;
  username: String;
  email: String;
  password: String;
  imgUrl: String;
};
const CategoriesPage = ({ params }: { params: { category: string } }) => {
  //getting blogs
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const router = useRouter();

  const getAllBlogs = async (category: string) => {
    console.log(category);
    try {
      const res = await getBlogsByCategory(category);
      console.log(res.data);
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataUsers = async () => {
    const res = await getAllUsers();
    console.log(res.data);
    setUsers(res.data);
  };

  const handleOnclick = (blog: any) => {
    router.push(`/posts/${blog._id}`);
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
    getAllBlogs(params.category), fetchDataUsers();
    setLoading(false);
  }, []);
  return (
    <>
      <h1 className="text-4xl font-bold text-center mx-6">
        {params.category} Posts
      </h1>
      {blogs.length > 0 ? (
        <div className="cursor-pointer flex-col max-w-xl items-center justify-center mx-auto">
          {blogs.map((blog, index) => (
            <div
              onClick={() => handleOnclick(blog)}
              key={index}
              className="flex flex-col bg-white rounded-2xl gap-5 my-20 max-w-xl"
            >
              {loading ? (
                <div className="relative h-[400px] flex">
                  {" "}
                  <Skeleton
                    containerClassName="flex-1"
                    height={300}
                    width={"100%"}
                  />
                </div>
              ) : (
                <div className="relative h-[400px]">
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
                  {" "}
                  {loading ? <Skeleton height={40} width={150} /> : blog.title}
                </h1>
                <p className="mt-3">
                  {loading ? <Skeleton height={20} width={280} /> : blog.text}
                </p>
                <div className="mt-5">
                  {users.map(
                    (userX) =>
                      userX.email === blog.user && (
                        <div className="inline-flex">
                          {userX.imgUrl ? (
                            <div className="relative h-10 w-10">
                              {loading ? (
                                <Skeleton
                                  circle
                                  width={"100%"}
                                  height={"100%"}
                                />
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
                            {" "}
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
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center font-bold mt-10 text-3xl">
            There is not any post for this category yet.
          </h1>

          <Image
            src={"/looking.png"}
            alt={"searching photo"}
            width={300}
            height={300}
            className="object-cover"
          />
        </div>
      )}
    </>
  );
};

export default CategoriesPage;
