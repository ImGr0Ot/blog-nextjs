"use client";
import { z } from "zod";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaFolderPlus } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { registerRequest, updateRequest } from "../api/user";
import { UserRegisterType } from "../utils/types";
import { signIn } from "next-auth/react";

const Register = () => {
  const userSchema = z.object({
    username: z
      .string()
      .max(20, "username: Max length is 20 characters")
      .min(6, "username: Min length is 6 characters"),
    email: z
      .string()
      .email("Email: Isnt a valid email")
      .min(15, "Email: Min length is 15 characters")
      .max(40, "Email: Max length is 40 characters"),
    password: z
      .string()
      .min(8, "Password: Min length is 8 characters")
      .max(20, "Password: Max length is 20 characters")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.,]).{8,20}$/,
        "Password: Must have at least 1 especial character, 1 number, 1 mayus and minus character"
      ),
  });
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const storage = getStorage(app);
  const router = useRouter();
  const [apiError, setApiError] = useState<String[]>([]);
  const { register, handleSubmit, reset } = useForm();

  const changeError = () => {
    const timer = setTimeout(() => {
      setApiError([]);
    }, 5000);
    return () => clearTimeout(timer);
  };
  const validateUser = (username: string, email: string, password: string) => {
    const newUser = {
      username,
      email,
      password,
    };
    const result = userSchema.safeParse(newUser);
    if (!result.success) {
      return result.error.issues as z.ZodIssue[];
    } else return null;
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        startTransition(async () => {
          //validations
          const validation = validateUser(
            data.username,
            data.email,
            data.password
          );
          if (validation != null) {
            validation.map((error) => {
              setApiError([...apiError, error.message]);
            });
            changeError();
            return reset();
          }
          const res = await registerRequest(data as UserRegisterType);
          if (res instanceof AxiosError) {
            console.log(res.response?.data.message[0]);
            setApiError([...apiError, res.response?.data.message[0]]);
            changeError();
            return reset();
          }
          //Code for upload the image***********
          if (data.imgUrl.length > 0) {
            const ImageFile = data.imgUrl[0] as File;
            console.log(data);
            const name = ImageFile.name;

            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, ImageFile);

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
                    const res = await updateRequest(data.email, downloadURL);
                    console.log(res);
                    if (res instanceof AxiosError) {
                      console.log(res.response?.data.message);
                      setApiError([...apiError, "An error occurred"]);
                      changeError();
                    } else {
                      signIn("credentials", {
                        email: data.email,
                        password: data.password,
                        redirect: false,
                      });
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
            const newUser = {
              email: data.email,
              username: data.username,
              password: data.password,
              imgUrl: "/defaultUser.png",
            };
            const res = await registerRequest(newUser as UserRegisterType);
            if (res instanceof AxiosError) {
              console.log(res.response?.data.message);
              setApiError(res.response?.data.message);
              changeError();
            } else {
              signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
              });
              router.push("/");
            }
          }
        });
      })}
      className="flex flex-col gap-8 mx-auto max-w-md bg-white p-8 rounded-md"
    >
      {" "}
      <div className="relative">
        <h1 className="absolute bottom-1 text-3xl p-4 font-semibold text-indigo-500 text-center bg-slate-100 rounded-md">
          Sign up
        </h1>
      </div>
      {apiError.length > 0 &&
        apiError.map((error, index) => (
          <p
            key={index}
            className="bg-red-500 text-white rounded-md p-3 text-center my-2"
          >
            {" "}
            {error}
          </p>
        ))}
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            value: 6,
            message: "Username must be 6 characters long",
          },
        })}
        className="p-3 focus:outline-none  border-b-2 border-slate-500 placeholder:text-slate-500"
        type="text"
        placeholder="username"
        name="username"
      />
      <input
        {...register("email", {
          required: "Email is required",
          minLength: {
            value: 8,
            message: "Email must be 8 characters long",
          },
        })}
        className="p-3 focus:outline-none  border-b-2 border-slate-500 placeholder:text-slate-500"
        type="email"
        placeholder="email@example.com"
        name="email"
      />
      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be 8 characters long",
          },
        })}
        className="p-3 focus:outline-none  border-b-2 border-slate-500 placeholder:text-slate-500"
        type="password"
        placeholder="password"
        name="password"
      />
      <div className="flex">
        <h2 className="text-md rounded-xl mt-2">Perfil's photo:</h2>
        <input
          {...register("imgUrl")}
          id="image"
          type="file"
          className="hidden"
        />
        <label htmlFor="image" className="ml-2 mt-1 cursor-pointer">
          <FaFolderPlus size={30} />
        </label>
      </div>
      <div className="flex justify-start">
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white p-3 text-center rounded-xl min-w-24"
        >
          {isPending ? (
            <div className="flex justify-center items-center gap-2">
              <h2>Submiting</h2>
              <BeatLoader color="white" size={10} />
            </div>
          ) : (
            <h2>Submit</h2>
          )}
        </button>
      </div>
      <p>
        {" "}
        Already have an account ? &nbsp;
        <button
          className="font-bold"
          onClick={() => {
            setLoading(true), router.push("/login");
          }}
        >
          {" "}
          <span className="hover:underline">
            {loading ? "Redirecting..." : "Log in"}
          </span>
        </button>{" "}
      </p>
    </form>
  );
};

export default Register;
