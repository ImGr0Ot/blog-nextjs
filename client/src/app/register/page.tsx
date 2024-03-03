"use client"
import { User, UserContext } from "../context/AuthContext"
import React, { FormEvent, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { FaFolderPlus } from "react-icons/fa"
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage"
import { app } from "../utils/firebase"
import { registerRequest } from "../api/user"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"

const Register = () => {
	const storage = getStorage(app)
	const router = useRouter()
	const [apiError, setApiError] = useState("")
	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm()
	const { registerUser, user, setUser, pageName, setPageName } =
		useContext(UserContext)

	const changeError = () => {
		const timer = setTimeout(() => {
			setApiError("")
		}, 5000)
		return () => clearTimeout(timer)
	}
	useEffect(() => {
		setPageName("Register")
	}, [])

	return (
		<form
			onSubmit={handleSubmit(async (data) => {
				//const res = await registerUser(getValues() as User)
				//Code for upload the image***********
				if (data.imgUrl[0] != null) {
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
								async (downloadURL) => {
									data.imgUrl = downloadURL
									console.log(data.imgUrl)
									// Sending to backend
									const res = await registerUser(data as User)
									if (res instanceof AxiosError) {
										console.log(res.response?.data.message[0])
										setApiError(res.response?.data.message[0])
										changeError()
									} else {
										router.push("/")
									}
									//redictering
									//router.push("/")
								},
								(error) => {
									console.log(error)
								}
							)
						}
					)
				}
				const newUser = {
					email: data.email,
					username: data.username,
					password: data.password,
				}
				const res = await registerUser(newUser as User)
				if (res instanceof AxiosError) {
					console.log(res.response?.data.message)
					setApiError(res.response?.data.message)
					changeError()
				} else {
					router.push("/")
				}
			})}
			className='flex flex-col gap-8 mx-auto max-w-md bg-slate-400 p-8 rounded-md'>
			<h1 className='text-4xl font-bold text-white text-center'>Sign up</h1>
			{apiError && (
				<p className='bg-red-500 text-white rounded-md p-3 text-center'>
					{" "}
					{apiError}
				</p>
			)}
			<input
				{...register("username", {
					required: "Username is required",
				})}
				className='p-3 rounded-md bg-slate-300 focus:outline-none text-slate-500'
				type='text'
				placeholder='Username'
				name='username'
			/>
			<input
				{...register("email", { required: "Email is required" })}
				className='p-3 rounded-md bg-slate-300 focus:outline-none text-slate-500'
				type='email'
				placeholder='email@example.com'
				name='email'
			/>
			<input
				{...register("password", {
					required: "Password is required",
					minLength: {
						value: 6,
						message: "Password must be 6 characters long",
					},
				})}
				className='p-3 rounded-md bg-slate-300 focus:outline-none text-slate-500'
				type='password'
				placeholder='Password'
				name='password'
			/>
			{formErrors.password && (
				<p className='bg-red-500 text-white rounded-md p-3 text-center'>
					{" "}
					{formErrors.password?.message as String}
				</p>
			)}

			<div className='flex'>
				<h2 className='text-md rounded-xl mt-2'>Perfil's photo:</h2>
				<input
					id='image'
					type='file'
					name='picture'
					{...register("imgUrl")}
					className='hidden'
				/>
				<label
					htmlFor='image'
					className='ml-2 mt-1 cursor-pointer'>
					<FaFolderPlus size={30} />
				</label>
			</div>
			<div className='flex justify-start'>
				<button
					type='submit'
					className='bg-indigo-500 text-white p-3 text-center rounded-xl'>
					Submit
				</button>
			</div>
			<p>
				{" "}
				Already have an account ? &nbsp;
				<Link
					className='font-bold'
					href={"/login"}>
					{" "}
					Sign in
				</Link>{" "}
			</p>
		</form>
	)
}

export default Register
