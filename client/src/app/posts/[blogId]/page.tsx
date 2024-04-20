"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import moment from "moment";
import { useSession } from "next-auth/react";

import {
  commentRequest,
  getBlog,
  getComments,
  deleteBlog,
} from "@/app/api/blog";
import { getAllUsers } from "../../api/user";

import { useRouter } from "next/navigation";
import { UserType } from "@/app/utils/types";

export type BlogWithId = {
  _id: String;
  title: String;
  text: String;
  imgUrl: String;
  category: String;
  date: Date;
  user: String;
  updated: Boolean;
};

const SinglePage = ({ params }: { params: { blogId: string } }) => {
  type Comment = {
    _id: String;
    content: String;
    blog: String;
    user: String;
  };
  const router = useRouter();
  const { data: session, status } = useSession();
  const [messageComment, setMessageComment] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [blog, setBlog] = useState<BlogWithId>({
    _id: "",
    title: "",
    text: "",
    imgUrl: "",
    date: new Date(),
    category: "",
    user: "",
    updated: false,
  });

  const handleDeleteClick = async () => {
    try {
      const res = await deleteBlog(params.blogId);
      console.log(res);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditClick = async () => {
    const url = new URLSearchParams({
      blogId: params.blogId,
    }).toString();
    router.push(`/create?${url}`);
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

  const fetchDataComments = async () => {
    const res = await getComments(params.blogId);
    setComments(res.data);
  };

  const fetchDataBlog = async () => {
    const res = await getBlog(params.blogId);
    setBlog(res.data);
    console.log(res.data);
  };
  const fetchDataUsers = async () => {
    const res = await getAllUsers();

    setUsers(res.data);
  };
  const handleCommentClick = async (e: any) => {
    const comment = {
      content: messageComment,
      userEmail: session?.user.email,
      blogId: blog._id,
    };
    console.log(comment);
    try {
      const res = await commentRequest(comment);
      if (res.status !== 200) {
        console.log("error");
        return;
      }
      setComments([...comments, res.data]);
    } catch (error) {
      console.log(error);
    }
    setMessageComment("");
    router.refresh();
  };
  useEffect(() => {
    fetchDataBlog(), fetchDataComments(), fetchDataUsers();
  }, []);

  return (
    <>
      {" "}
      <div className="flex flex-col  bg-white rounded-2xl gap-5 xl:gap-12 max-w-screen-md mx-auto">
        <div className="relative h-[500px]">
          <Image
            src={blog.imgUrl as string}
            alt={"blog photo"}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
        <div className="flex flex-col p-5  text-left my-auto">
          <h1 className="text-4xl">{blog.title}</h1>
          <p className="mt-3">{blog.text}</p>
          <div className="mt-4 inline-flex items-center">
            {users.map(
              (userX) =>
                userX.email === blog.user && (
                  <div key={userX.email as string} className="inline-flex">
                    {userX.imgUrl ? (
                      <div className="relative h-10 w-10">
                        <Image
                          className="rounded-full cursor-none"
                          src={userX.imgUrl as string}
                          alt={"user logo"}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    ) : (
                      <div className="relative h-10 w-10">
                        <Image
                          className="rounded-full cursor-none"
                          src={"/defaultUser.png"}
                          alt={"user logo"}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    <span className="ml-2 mt-2">@{userX.username}</span>
                  </div>
                )
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col xl:flex-row mt-2">
              {blog.updated ? "Updated" : "Created"}&nbsp;
              {moment(new Date(blog.date)).fromNow()} - &nbsp;
              <span className={getCategoryColor(blog.category)}>
                {blog.category}
              </span>
            </div>
            {session?.user.email === blog.user && (
              <div className="flex mt-2 justify-end items-end gap-4">
                <button
                  onClick={handleEditClick}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold p-2 min-w-20 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold p-2 min-w-20 rounded-lg"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/*--------------------Write a Comment-------------------*/}
      {status == "authenticated" && (
        <div className="flex flex-col sm:flex-row gap-3 mt-10">
          <textarea
            cols={30}
            rows={5}
            name="textAreaComments"
            id="textAreaComments"
            value={messageComment}
            onChange={(e) => setMessageComment(e.target.value)}
            placeholder="Write your comment here..."
            className="rounded-lg focus:outline-none p-4"
          ></textarea>
          <div className="flex justify-end items-end">
            <button
              onClick={handleCommentClick}
              className="bg-slate-500 hover:bg-slate-700 text-white rounded-lg p-2 min-w-32"
            >
              Send
            </button>
          </div>
        </div>
      )}
      {comments.length != 0 && <h1 className="text-3xl mt-10">Comments </h1>}
      {/*Comments!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
      {comments.map((comment) => (
        <div className="flex flex-col gap-8 mt-10">
          <div className="flex flex-col p-2 gap-5">
            <div className="flex items-center">
              {users.map(
                (userX, index) =>
                  userX.email === comment.user && (
                    <div key={index} className="inline-flex">
                      {userX.imgUrl ? (
                        <div className="relative h-10 w-10">
                          <Image
                            className="rounded-full cursor-none"
                            src={userX.imgUrl as string}
                            alt={"user logo"}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      ) : (
                        <div className="relative h-10 w-10">
                          <Image
                            className="rounded-full cursor-none"
                            src={"/defaultUser.png"}
                            alt={"user logo"}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      )}
                      <span className="ml-2 mt-2">@{userX.username} say:</span>
                    </div>
                  )
              )}
            </div>
            <div className="bg-slate-200 rounded-lg max-w-screen-md">
              <p className="p-3">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default SinglePage;
