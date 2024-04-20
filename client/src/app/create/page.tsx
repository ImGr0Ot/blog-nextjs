"use client";
import { blogRequest, getBlog, updateBlog } from "../api/blog";
import { Form, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Blog } from "@/app/context/BlogContext";
import { app } from "../utils/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useState, useTransition } from "react";

import { useSession } from "next-auth/react";

const createAPostPage = () => {
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();
  const [searchParamsExist, setSearchParamsExist] = useState(false);

  const [blog, setBlog] = useState<Blog>({
    title: "",
    text: "",
    imgUrl: "",
    date: new Date(),
    category: "",
    user: "",
    updated: false,
  });
  const useParams = useSearchParams();
  const { register, handleSubmit } = useForm();
  const storage = getStorage(app);

  const router = useRouter();

  const getBlogToUpdate = async () => {
    const res = await getBlog(useParams.get("blogId") as string);
    setBlog(res.data);
    console.log(res.data);
  };
  const updateBlogA = async (blogId: string, newBlog: Blog) => {
    await updateBlog(newBlog, blogId);
  };

  useEffect(() => {
    if (useParams.get("blogId")) {
      getBlogToUpdate();
      setSearchParamsExist(true);
    } else {
      setSearchParamsExist(false);
    }
  }, [useParams.get("blogId")]);

  return (
    <>
      {" "}
      <h1 className="text-4xl rounded-xl md:text-center">
        {" "}
        {useParams.get("blogId") ? "Update your Post" : "Create your a post"}
      </h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          startTransition(async () => {
            console.log(data);
            if (data.imgUrl.length > 0) {
              //Code for upload the image***********
              const ImageFile = data.imgUrl[0] as File;
              console.log(ImageFile);

              console.log(data);
              const name = ImageFile.name;
              const storageRef = ref(storage, name);

              const uploadTask = uploadBytesResumable(
                storageRef,
                data.imgUrl[0]
              );

              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadURL) => {
                      data.imgUrl = downloadURL;

                      // Sending to backend

                      const newBlog = {
                        title: data.title,
                        text: data.text,
                        imgUrl: data.imgUrl,
                        date: new Date(),
                        category: data.category,
                        user: session?.user.email,
                      };
                      if (searchParamsExist) {
                        await updateBlogA(
                          useParams.get("blogId") as string,
                          { ...newBlog, updated: true } as Blog
                        );

                        router.push("/");
                      } else {
                        console.log(newBlog);
                        blogRequest({ ...newBlog, updated: false } as Blog);

                        router.push("/");
                      }
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                }
              );
            } else {
              if (searchParamsExist) {
                const newBlog = {
                  title: data.title,
                  text: data.text,
                  imgUrl: "",
                  date: new Date(),
                  category: data.category,
                  user: session?.user.email,
                };
                const res = await updateBlogA(
                  useParams.get("blogId") as string,
                  { ...newBlog, updated: true } as Blog
                );

                console.log(res);
                router.push("/");
              }
            }
          });
        })}
      >
        <div className="flex flex-col gap-5 bg-white rounded-lg mt-10 p-7 md:mx-auto max-w-4xl">
          <div className="flex flex-col gap-3">
            {searchParamsExist ? (
              <input
                {...register("title", { required: false })}
                type="text"
                className="text-xl rounded-lg ring-2 ring-slate-500 p-3 focus:outline-none"
                defaultValue={blog.title as string}
                name="title"
              />
            ) : (
              <input
                {...register("title", { required: true })}
                type="text"
                className="text-xl rounded-lg ring-2 ring-slate-500 p-3 focus:outline-none"
                placeholder={"Enter your post's text"}
                name="title"
              />
            )}
          </div>

          <hr className="w-[80%] h-0.5 border-0 bg-gray-300 mx-auto mt-4 " />

          <div className="flex flex-col gap-3">
            {searchParamsExist ? (
              <textarea
                {...register("text", { required: false })}
                className="text-xl rounded-lg ring-2 ring-slate-500 p-3 focus:outline-none"
                defaultValue={blog.text as string}
                name="text"
              />
            ) : (
              <textarea
                {...register("text", { required: true })}
                className="text-xl rounded-lg ring-2 ring-slate-500 p-3 focus:outline-none"
                placeholder={"Enter your post's text"}
                name="text"
              />
            )}
          </div>
          <hr className="w-[60%] h-0.5 border-0 bg-gray-300 mx-auto mt-4" />

          {/*CATEGORIAS*/}

          <select
            defaultValue={searchParamsExist ? (blog.category as string) : ""}
            {...(useParams.get("blogId")
              ? { ...register("category", { required: false }) }
              : { ...register("category", { required: true }) })}
            className="focus:outline-none inline-block mx-auto cursor-pointer p-2 ring-2 ring-slate-500 rounded-lg"
          >
            <option className="text-white" value="" disabled>
              Choose a category
            </option>
            <option value={"Education"} className="text-center">
              Education
            </option>
            <option className="text-center">Tecnology</option>

            <option value={"Sport"} className="text-center">
              Sport
            </option>
            <option value={"Art"} className="text-center">
              Art
            </option>

            <option value={"Fashion"} className="text-center">
              Fashion
            </option>
            <option value={"Other"} className="text-center">
              Other
            </option>
          </select>
          <hr className="w-[40%] h-0.5 border-0 bg-gray-300 mx-auto mt-4" />

          <h2 className="text-xl font-semibold text-center mt-2">
            {searchParamsExist ? "Update the image" : "Select the image"}
          </h2>
          {searchParamsExist ? (
            <input
              {...register("imgUrl", { required: false })}
              type="file"
              name="imgUrl"
              className="file:border-none file:bg-gray-400 ring-2 ring-slate-500 border-none rounded-lg mx-auto  cursor-pointer focus:outline-none  w-[60%]"
            />
          ) : (
            <input
              {...register("imgUrl", { required: true })}
              type="file"
              name="imgUrl"
              className="file:border-none file:bg-gray-400 ring-2 ring-slate-500 border-none rounded-lg mx-auto  cursor-pointer focus:outline-none  w-[60%]"
            />
          )}
          <div className="flex justify-end mt-16">
            <button
              type="submit"
              className="bg-green-300 hover:bg-green-400 rounded-lg p-2 font-semibold"
            >
              {searchParamsExist ? "Update Post" : "Publish Post"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default createAPostPage;
