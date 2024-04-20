"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Loading from "../loading";

const Navbar = () => {
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();

  const router = useRouter();
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = async () => {
    await signOut();
    handleNav;
    router.push("/");
  };

  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <div className="flex justify-between z-10 mb-16">
          <div className="flex justify-start">
            <Link href={"/"}>
              <div>
                <Image
                  style={{ filter: "invert(70%)" }}
                  className="cursor-pointer"
                  src={
                    "/GROOTLOGO-removebg--WHITE-VECTORIZADO-ARREGLADOsvg.svg"
                  }
                  width={80}
                  height={80}
                  alt="logo"
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-end  lg:hidden pt-2 cursor-pointer mx-8">
            <AiOutlineMenu
              onClick={handleNav}
              color="black"
              size={25}
              className={menuOpen ? "hidden" : "hover:scale-110 duration-300"}
            />
            <div
              className={
                menuOpen
                  ? "fixed lg:hidden right-8 top-5 rounded-xl text-[12px]  w-[200px] h-[180px] duration-500 mx-12 sm:mx-20"
                  : "fixed left-[-100%]"
              }
            >
              <div className="flex flex-col bg-slate-200 rounded-lg p-2">
                <div className="flex flex-col items-end">
                  <AiOutlineClose
                    onClick={handleNav}
                    size={20}
                    className="hover:scale-125 duration-300 "
                  />
                </div>
                <div className="flex flex-col items-center text-[16px] gap-3 text-center">
                  <button
                    onClick={() =>
                      startTransition(() => {
                        handleNav;
                        router.push("/");
                      })
                    }
                    className={
                      pathName === "/"
                        ? "font-bold ring-2 ring-slate-500 pointer-events-none cursor-none p-3 rounded-md min-w-32"
                        : "font-bold hover:bg-opacity-15 hover:bg-slate-500 p-3 rounded-md duration-300 min-w-32"
                    }
                  >
                    Home Page
                  </button>
                  {status === "authenticated" && (
                    <button
                      onClick={() =>
                        startTransition(() => {
                          handleNav;
                          router.push("/create");
                        })
                      }
                      className={
                        pathName === "/create"
                          ? "ring-2 ring-slate-500 pointer-events-none cursor-none p-3 rounded-md min-w-32 text-center"
                          : "font-bold hover:bg-opacity-15 hover:bg-slate-500 p-3 rounded-md duration-300 min-w-32 text-center"
                      }
                    >
                      Create a post
                    </button>
                  )}
                  {status === "authenticated" ? (
                    <button
                      onClick={() =>
                        startTransition(async () => {
                          await handleLogout();
                          router.push("/");
                        })
                      }
                      className="font-bold hover:bg-opacity-15 hover:bg-slate-500 p-3 rounded-md duration-300 min-w-32 text-center"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        startTransition(() => {
                          handleNav;
                          router.push("/login");
                        })
                      }
                      className={
                        pathName === "/login"
                          ? "ring-2 ring-slate-500 pointer-events-none cursor-none p-3 rounded-md min-w-32 text-center"
                          : "font-bold hover:bg-opacity-15 hover:bg-slate-500 p-3 rounded-md duration-300 min-w-32 text-center"
                      }
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>

            {status === "authenticated" && (
              <div className="lg:hidden ml-8 relative h-10 w-10">
                {session.user.imgUrl ? (
                  <>
                    <Image
                      layout="fill"
                      objectFit="cover"
                      className={
                        menuOpen ? "hidden" : "cursor-none rounded-full"
                      }
                      src={session.user.imgUrl}
                      alt={"user logo"}
                    />
                  </>
                ) : (
                  <>
                    <Image
                      className={
                        menuOpen ? "hidden" : "rounded-full cursor-none"
                      }
                      src={"/defaultUser.png"}
                      alt={"user logo"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </>
                )}
              </div>
            )}
          </div>
          <div className="lg:flex hidden items-center justify-end pt-2 cursor-pointer gap-6 md:mx-20">
            <button
              onClick={() =>
                startTransition(() => {
                  router.push("/");
                })
              }
              className={
                pathName === "/"
                  ? "ring-2 ring-slate-500 pointer-events-none cursor-none p-3 rounded-md min-w-32 text-center"
                  : "font-bold hover:bg-opacity-15 hover:bg-slate-500 p-3 rounded-md duration-300 text-center"
              }
            >
              Home Page
            </button>
            {status === "authenticated" && (
              <button
                onClick={() =>
                  startTransition(() => {
                    router.push("/create");
                  })
                }
                className={
                  pathName === "/create"
                    ? "ring-2 ring-slate-500 pointer-events-none cursor-none p-3 rounded-md min-w-32 text-center"
                    : "font-bold hover:bg-opacity-15 hover:bg-slate-500 p-3 rounded-md duration-300 min-w-32 text-center"
                }
              >
                Create a post
              </button>
            )}
            {status === "authenticated" ? (
              <button
                onClick={() =>
                  startTransition(() => {
                    handleLogout;
                    router.push("/");
                  })
                }
                className="font-bold hover:bg-opacity-15 hover:bg-slate-500 p-3 rounded-md duration-300 min-w-32 text-center"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() =>
                    startTransition(() => {
                      router.push("/login");
                    })
                  }
                  className={
                    pathName === "/login"
                      ? "ring-2 ring-slate-500 pointer-events-none cursor-none p-3 rounded-md min-w-32 text-center"
                      : "font-bold hover:bg-opacity-15 hover:bg-slate-500 p-3 rounded-md duration-300 min-w-32 text-center"
                  }
                >
                  Login
                </button>
              </>
            )}
            {status === "authenticated" && (
              <div className="inline-flex">
                <div className="gap-2 relative h-10 w-10 ml-5">
                  {session.user.imgUrl ? (
                    <>
                      <Image
                        className="rounded-full cursor-none"
                        src={session.user.imgUrl}
                        alt={"user logo"}
                        layout="fill"
                        objectFit="cover"
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        className="rounded-full cursor-none"
                        src={"/defaultUser.png"}
                        alt={"user logo"}
                        layout="fill"
                        objectFit="cover"
                      />
                    </>
                  )}
                </div>
                <h1 className="font-bold mt-2 ml-2">{session.user.username}</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
