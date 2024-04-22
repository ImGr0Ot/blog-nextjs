import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Link href={"/"}>
          <Image
            src={"/notFoundImage.webp"}
            alt={"loading Image"}
            className="object-contain"
            width={400}
            height={400}
          />
          <h1 className="text-center font-hero text-4xl font-bold text-slate-700 mt-10">
            Page not found
          </h1>
        </Link>
      </div>
    </>
  );
}
