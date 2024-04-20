"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const Categories = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleOnClick = (category: string) => {
    // Perform the transition
    startTransition(() => {
      router.push(`/posts/categories/${category}`);
    });
  };
  return (
    <>
      <h1 className="font-bold mx-20 mt-10 mb-5 text-center ">
        {" "}
        Popular Categories
      </h1>
      {isPending ? (
        <Loading />
      ) : (
        <div className="pl-10  inline-grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-center gap-8">
          <button
            onClick={() => handleOnClick("Education")}
            className="bg-red-200 hover:bg-red-400 rounded-xl p-2 w-30 h-10 text-center"
          >
            Education
          </button>
          <button
            onClick={() => handleOnClick("Tecnology")}
            className="bg-amber-200 hover:bg-amber-400 rounded-xl p-2 w-30 h-10 text-center"
          >
            Tecnology
          </button>

          <button
            onClick={() => handleOnClick("Sport")}
            className="bg-green-200 hover:bg-green-400 rounded-xl p-2 w-28 h-10 text-center"
          >
            Sport
          </button>
          <button
            onClick={() => handleOnClick("Art")}
            className="bg-indigo-200 hover:bg-indigo-400 rounded-xl p-2 w-28 h-10 text-center"
          >
            Art
          </button>

          <button
            onClick={() => handleOnClick("Fashion")}
            className="bg-pink-200 hover:bg-pink-400 rounded-xl p-2 w-28 h-10 text-center"
          >
            Fashion
          </button>
          <button
            onClick={() => handleOnClick("Other")}
            className="bg-purple-200 hover:bg-purple-400 rounded-xl p-2 w-28 h-10 text-center"
          >
            Other
          </button>
        </div>
      )}
    </>
  );
};

export default Categories;
