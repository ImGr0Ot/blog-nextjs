"use client"
import Link from "next/link"
import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { UserContext } from "../context/AuthContext"
import { useRouter } from "next/navigation"

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const { user, setIsAuthenticated, isAuthenticated, pageName, setPageName } =
		useContext(UserContext)
	const router = useRouter()
	const handleNav = () => {
		setMenuOpen(!menuOpen)
	}
	const handleLogout = () => {
		setIsAuthenticated(false)
		handleNav
		router.push("/")
	}

	return (
		<div className='flex justify-between z-10'>
			<div className='flex justify-start'>
				<Link href={"/"}>
					<Image
						style={{ filter: "invert(70%)" }}
						className='cursor-pointer'
						src={"/GROOTLOGO-removebg--WHITE-VECTORIZADO-ARREGLADOsvg.svg"}
						width={90}
						height={90}
						alt='logo'
					/>
				</Link>
			</div>

			<div className='flex items-center justify-end  lg:hidden pt-2 cursor-pointer mx-8'>
				<AiOutlineMenu
					onClick={handleNav}
					color='black'
					size={25}
					className={menuOpen ? "hidden" : "hover:size-[30px] duration-300"}
				/>
				<div
					className={
						menuOpen
							? "fixed lg:hidden right-8 top-5 rounded-xl text-[12px]  w-[200px] h-[150px] duration-500 mx-12 sm:mx-20"
							: "fixed left-[-100%]"
					}>
					<div className='bg-slate-200 rounded-lg p-3'>
						<div className='flex flex-col items-end pt-2 pr-2'>
							<AiOutlineClose
								onClick={handleNav}
								size={20}
								className='hover:size-[25px] duration-300'
							/>
						</div>
						<div className='flex flex-col items-center text-[16px] gap-4 text-center'>
							<Link
								onClick={handleNav}
								href='/'
								className={
									pageName === "Home"
										? "font-bold text-slate-500  pointer-events-none"
										: "font-bold hover:text-slate-500"
								}>
								Home Page
							</Link>
							{isAuthenticated && (
								<Link
									onClick={handleNav}
									href='/create'
									className='cursor-pointer'>
									<h1 className='font-bold hover:text-slate-500'>
										Create a post
									</h1>
								</Link>
							)}
							{isAuthenticated ? (
								<Link
									onClick={handleLogout}
									href='/'
									className='cursor-pointer'>
									<h1 className='font-bold hover:text-slate-500'>Logout</h1>
								</Link>
							) : (
								<Link
									onClick={handleNav}
									href='/login'
									className={
										pageName === "Login"
											? "font-bold text-slate-500  pointer-events-none"
											: "font-bold hover:text-slate-500"
									}>
									Login
								</Link>
							)}
						</div>
					</div>
				</div>

				{isAuthenticated && (
					<div className='lg:hidden ml-8 relative h-10 w-10'>
						{user.imgUrl ? (
							<Image
								layout='fill'
								objectFit='cover'
								className={menuOpen ? "hidden" : "cursor-none rounded-full"}
								src={user.imgUrl as string}
								alt={"user logo"}
							/>
						) : (
							<Image
								className={menuOpen ? "hidden" : "rounded-full cursor-none"}
								src={"/defaultUser.png"}
								alt={"user logo"}
								layout='fill'
								objectFit='cover'
							/>
						)}
					</div>
				)}
			</div>
			<div className='lg:flex hidden items-center justify-end pt-2 cursor-pointer gap-6 md:mx-20'>
				<Link
					href='/'
					className={
						pageName === "Home"
							? "font-bold text-slate-500  pointer-events-none"
							: "font-bold hover:text-slate-500"
					}>
					Home Page
				</Link>

				{isAuthenticated && (
					<Link
						href='/create'
						className='cursor-pointer'>
						<h1 className='font-bold hover:text-slate-500'>Create a post</h1>
					</Link>
				)}
				{isAuthenticated ? (
					<Link
						onClick={handleLogout}
						href='/'
						className='cursor-pointer'>
						<h1 className='font-bold hover:text-slate-500'>Logout</h1>
					</Link>
				) : (
					<Link
						href='/login'
						className={
							pageName === "Login"
								? "font-bold text-slate-500  pointer-events-none"
								: "font-bold hover:text-slate-500"
						}>
						Login
					</Link>
				)}
				{isAuthenticated && (
					<div className='inline-flex'>
						<div className='gap-2 relative h-10 w-10 ml-5'>
							{user.imgUrl ? (
								<Image
									className='rounded-full cursor-none'
									src={user.imgUrl as string}
									alt={"user logo"}
									layout='fill'
									objectFit='cover'
								/>
							) : (
								<Image
									className='rounded-full cursor-none'
									src={"/defaultUser.png"}
									alt={"user logo"}
									layout='fill'
									objectFit='cover'
								/>
							)}
						</div>
						<h1 className='font-bold mt-2 ml-2'>{user.username}</h1>
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar
