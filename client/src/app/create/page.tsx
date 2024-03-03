"use client"
import { blogRequest } from "../api/blog"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { app } from "../utils/firebase"
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/AuthContext"

const createAPostPage = () => {
	const { register, handleSubmit } = useForm()
	const storage = getStorage(app)
	const {
		user: userAuthenticated,
		pageName,
		setPageName,
		isAuthenticated,
	} = useContext(UserContext)
	const router = useRouter()

	useEffect(() => {
		setPageName("Create"), !isAuthenticated && router.push("/login")
	}, [])

	return (
		<>
			{" "}
			<h1 className='text-4xl rounded-xl md:text-center'>
				{" "}
				Create your a post
			</h1>
			<form
				onSubmit={handleSubmit(async (data) => {
					console.log("data before the upload" + data)
					//Code for upload the image***********
					const name = data.imgUrl[0].name
					const storageRef = ref(storage, name)

					const uploadTask = uploadBytesResumable(storageRef, data.imgUrl[0])

					uploadTask.on(
						"state_changed",
						(snapshot) => {
							const progress =
								(snapshot.bytesTransferred / snapshot.totalBytes) * 100
							console.log("Upload is " + progress + "% done")
							switch (snapshot.state) {
								case "paused":
									console.log("Upload is paused")
									break
								case "running":
									console.log("Upload is running")
									break
							}
						},
						(error) => {
							console.log(error)
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then(
								(downloadURL) => {
									data.imgUrl = downloadURL

									// Sending to backend
									//le paso a rhf la url
									const newBlog = {
										...data,
										userId: userAuthenticated.id,
									}
									blogRequest(newBlog)
									router.push("/")
								},
								(error) => {
									console.log(error)
								}
							)
						}
					)
				})}>
				<div className='flex flex-col gap-5 bg-white rounded-xl mt-10 p-7 md:mx-auto max-w-4xl'>
					<div className='flex flex-col gap-3'>
						<h2 className='text-4xl rounded-xl text-center'> Title:</h2>
						<input
							{...register("title", { required: true })}
							type='text'
							className='text-xl rounded-xl bg-slate-500 p-3 text-white focus:outline-none'
							placeholder="Enter your post's tittle"
						/>
					</div>

					<hr className='w-[80%] h-0.5 border-0 bg-gray-300 mx-auto mt-4 ' />

					<div className='flex flex-col gap-3'>
						<h2 className='text-4xl rounded-xl text-center'> Text:</h2>
						<textarea
							{...register("text", { required: true })}
							className='text-xl rounded-xl bg-slate-500 p-3 focus:outline-none text-white'
							placeholder="Enter your post's text"
						/>
					</div>
					<hr className='w-[60%] h-0.5 border-0 bg-gray-300 mx-auto mt-4' />

					{/*CATEGORIAS*/}
					<h2 className='text-4xl rounded-xl text-center mt-2'> Category:</h2>
					<select
						{...register("category", { required: true })}
						className='focus:outline-none inline-block mx-auto cursor-pointer p-2 bg-slate-500 text-slate-200 rounded-xl'>
						<option
							className='text-white'
							disabled
							selected>
							Select a category
						</option>
						<option className='text-center'>Education</option>
						<option className='text-center'>Tecnology</option>

						<option className='text-center'>Sport</option>
						<option className='text-center'>Art</option>

						<option className='text-center'>Fashion</option>
						<option className='text-center'>Other</option>
					</select>
					<hr className='w-[40%] h-0.5 border-0 bg-gray-300 mx-auto mt-4' />

					<h2 className='text-4xl rounded-xl text-center mt-2'> Image:</h2>
					<input
						type='file'
						name='picture'
						{...register("imgUrl", { required: true })}
						className='file:border-none file:bg-gray-100 bg-slate-500 border-none rounded-lg mx-auto text-white cursor-pointer focus:outline-none'
					/>
					<div className='flex justify-end mt-16'>
						<button
							type='submit'
							className='bg-green-300 hover:bg-green-400 rounded-2xl p-2'>
							Publish Post
						</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default createAPostPage
