import Image from "next/image";
import Categories from "./components/Categories";
import ListCard from "./components/ListCard";

export default function Home() {
  return (
    <>
      <div className="flex flex-col lg:flex lg:flex-row bg-white rounded-2xl gap-5 xl:gap-12">
        <div className="md:flex justify-start">
          <Image
            src={"/Hero-Post-Image.jpg"}
            alt={"hero photo"}
            width={900}
            height={900}
            className="rounded-2xl"
          />
        </div>

        <div className="flex-col lg:flex justify-end lg:justify-center p-5 pl-0 text-left ml-8">
          <h1 className="text-4xl">
            {" "}
            <span className="font-bold">Hello friend, </span> make or see an
            incredible post.
          </h1>
          <p className="mt-3">
            Use your imagination on our website to create incredible ones, you
            can also see the posts of other users, but first you must log in,
            take your time and have fun.
          </p>
          <div className="mt-4 flex items-center">
            <Image
              className="rounded-full"
              src="/icon-image.jpg"
              width={36}
              height={36}
              alt="Picture of the author"
            />
            <span className="ml-2">Ceo of Groot's Enterprise</span>
          </div>
          <div className="flex items-center mt-2">
            2.14.2024 - &nbsp;<span className="text-purple-300">Other</span>
          </div>
        </div>
      </div>

      <Categories />

      {/* posts */}
      <ListCard />
    </>
  );
}
