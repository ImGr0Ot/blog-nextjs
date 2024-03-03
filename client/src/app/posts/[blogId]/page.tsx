"use client"
import React, { useContext, useEffect, useState } from "react"
import Image from "next/image"
import Comments from "../../components/Comments"
import moment from "moment"

import { commentRequest, getBlog, getComments } from "../../api/blog"
import { getAllUsers } from "../../api/user"
import { Blog } from "../../context/BlogContext"
import { User, UserContext } from "../../context/AuthContext"
import { useRouter } from "next/navigation"

const SinglePage = ({ params }: { params: { blogId: string } }) => {
	type Comment = {
		_id: String
		content: String
		blog: String
		user: String
	}
	const router = useRouter()
	const { pageName, setPageName, user, isAuthenticated } =
		useContext(UserContext)
	const [messageComment, setMessageComment] = useState("")
	const [users, setUsers] = useState<User[]>([])
	const [comments, setComments] = useState<Comment[]>([])
	const [blog, setBlog] = useState<Blog>({
		_id: "",
		title: "",
		text: "",
		imgUrl: "",
		date: new Date(),
		category: "",
		user: "",
	})
	const getCategoryColor = (category: String) => {
		switch (category) {
			case "Education":
				return "text-red-300"
			case "Tecnology":
				return "text-amber-300"
			case "Sport":
				return "text-green-300"
			case "Fashion":
				return "text-pink-300"
			case "Other":
				return "text-purple-300"
			case "Art":
				return "text-indigo-300"
		}
	}

	const fetchDataComments = async () => {
		const res = await getComments(params.blogId)

		setComments(res.data)
	}

	const fetchDataBlog = async () => {
		const res = await getBlog(params.blogId)

		setBlog(res.data)
	}
	const fetchDataUsers = async () => {
		const res = await getAllUsers()

		setUsers(res.data)
	}
	const handleCommentClick = async (e: any) => {
		const comment = {
			content: messageComment,
			blogId: blog._id,
			userId: user.id,
		}
		console.log(comment)
		try {
			await commentRequest(comment)
		} catch (error) {
			console.log(error)
		}
		setMessageComment("")
		router.push(`/blogs/${params.blogId}`)
	}
	useEffect(() => {
		fetchDataBlog(),
			fetchDataComments(),
			fetchDataUsers(),
			setPageName("SingleBlog")
	}, [])

	return (
		<>
			{" "}
			<div className='flex flex-col  bg-white rounded-2xl gap-5 xl:gap-12 max-w-screen-md mx-auto'>
				<div className='relative h-[500px]'>
					<Image
						src={blog.imgUrl as string}
						alt={"blog photo"}
						layout='fill'
						objectFit='cover'
						className='rounded-2xl'
					/>
				</div>
				<div className='flex flex-col p-5  text-left my-auto'>
					<h1 className='text-4xl'>{blog.title}</h1>
					<p className='mt-3'>{blog.text}</p>
					<div className='mt-4 inline-flex items-center'>
						{users.map(
							(userX) =>
								userX._id === blog.user && (
									<div className='inline-flex'>
										{userX.imgUrl ? (
											<div className='relative h-10 w-10'>
												<Image
													className='rounded-full cursor-none'
													src={userX.imgUrl as string}
													alt={"user logo"}
													layout='fill'
													objectFit='cover'
												/>
											</div>
										) : (
											<div className='relative h-10 w-10'>
												<Image
													className='rounded-full cursor-none'
													src={"/defaultUser.png"}
													alt={"user logo"}
													layout='fill'
													objectFit='cover'
												/>
											</div>
										)}
										<span className='ml-2 mt-2'>@{userX.username}</span>
									</div>
								)
						)}
					</div>
					<div className='flex flex-col xl:flex-row mt-2'>
						{moment(new Date(blog.date)).fromNow()} - &nbsp;
						<span className={getCategoryColor(blog.category)}>
							{blog.category}
						</span>
					</div>
				</div>
			</div>
			{/*--------------------Write a Comment-------------------*/}
			{isAuthenticated && (
				<div className='flex flex-col sm:flex sm:flex-row gap-3 mt-10'>
					<textarea
						cols={30}
						rows={5}
						name='textAreaComments'
						id='textAreaComments'
						value={messageComment}
						onChange={(e) => setMessageComment(e.target.value)}
						placeholder='Write your comment here...'
						className='rounded-xl focus:outline-none p-2'></textarea>

					<button
						onClick={handleCommentClick}
						className='flex justify-end sm:mt-24 bg-slate-500 hover:bg-slate-700 text-white rounded-full p-2 px-4'>
						Send
					</button>
				</div>
			)}
			{comments.length != 0 && <h1 className='text-3xl mt-10'>Comments </h1>}
			{/*Comments!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
			{comments.map((comment) => (
				<div className='flex flex-col gap-8 mt-10'>
					<div className='flex flex-col p-2 gap-5'>
						<div className='flex items-center'>
							{users.map(
								(userX) =>
									userX._id === comment.user && (
										<div className='inline-flex'>
											{userX.imgUrl ? (
												<div className='relative h-10 w-10'>
													<Image
														className='rounded-full cursor-none'
														src={userX.imgUrl as string}
														alt={"user logo"}
														layout='fill'
														objectFit='cover'
													/>
												</div>
											) : (
												<div className='relative h-10 w-10'>
													<Image
														className='rounded-full cursor-none'
														src={"/defaultUser.png"}
														alt={"user logo"}
														layout='fill'
														objectFit='cover'
													/>
												</div>
											)}
											<span className='ml-2 mt-2'>@{userX.username} say:</span>
										</div>
									)
							)}
						</div>
						<div className='bg-slate-200 rounded-lg max-w-screen-md'>
							<p className='p-3'>{comment.content}</p>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
export default SinglePage
