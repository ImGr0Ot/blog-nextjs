"use client";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const userSchema = z.object({
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
  const [apiError, setApiError] = useState<String[]>([]);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const router = useRouter();
  const validateUser = (email: string, password: string) => {
    const newUser = {
      email,
      password,
    };
    const result = userSchema.safeParse(newUser);
    if (!result.success) {
      return result.error.issues as z.ZodIssue[];
    } else return null;
  };
  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      //validations
      const validation = validateUser(data.email, data.password);
      if (validation != null) {
        validation.map((error) => {
          setApiError([...apiError, error.message]);
        });
        changeError();
        return reset();
      }
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res!.ok) {
        console.log(res);
        setApiError([...apiError, "User or password incorrect"]);
        changeError();
        return;
      } else {
        router.push("/");
      }
    });
  });

  const changeError = () => {
    const timer = setTimeout(() => {
      setApiError([]);
    }, 5000);
    return () => clearTimeout(timer);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-8 mx-auto max-w-md bg-white p-8 rounded-md"
    >
      <div className="relative">
        <h1 className="absolute bottom-1 text-3xl p-4 font-semibold text-indigo-500 text-center bg-slate-100 rounded-md">
          Sign in
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
        {...register("email", {
          required: "Email is required",
          minLength: {
            value: 8,
            message: "Email must 8 characters long",
          },
        })}
        className="p-3 focus:outline-none border-b-2 border-slate-500 placeholder:text-slate-500"
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
        className="p-3 focus:outline-none border-b-2 border-slate-500 placeholder:text-slate-500"
        type="password"
        placeholder="password"
        name="password"
      />

      <div className="flex justify-start ">
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
            setLoading(true), router.push("/register");
          }}
        >
          {" "}
          <span className="hover:underline">
            {loading ? "Redirecting..." : "Sign up"}
          </span>
        </button>{" "}
      </p>
    </form>
  );
};

export default Login;
