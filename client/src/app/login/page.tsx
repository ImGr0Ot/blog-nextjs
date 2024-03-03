"use client"
import { UserContext } from "../context/AuthContext"
import React, { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { User } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"

const Login = () => {
	const [apiError, setApiError] = useState("")
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const { loginUser, user, setUser, isAuthenticated, pageName, setPageName } =
		useContext(UserContext)
	const router = useRouter()

	const onSubmit = handleSubmit(async (data) => {
		const res = await loginUser(data as User)
		if (res instanceof AxiosError) {
			console.log(res.response?.data.message[0])
			setApiError(res.response?.data.message[0])
			changeError()
		} else {
			router.push("/")
		}
	})

	const changeError = () => {
		const timer = setTimeout(() => {
			setApiError("")
		}, 4000)
		return () => clearTimeout(timer)
	}

	useEffect(() => {
		setPageName("Login")
	}, [])

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col gap-8 mx-auto max-w-md bg-slate-400 p-8 rounded-md'>
			<h1 className='text-4xl font-bold text-white text-center'>Sign in</h1>

			{apiError && (
				<p className='bg-red-500 text-white rounded-md p-3 text-center'>
					{" "}
					{apiError}
				</p>
			)}

			<input
				{...register("email", { required: true })}
				className='p-3 rounded-md bg-slate-300 focus:outline-none text-slate-500'
				type='email'
				placeholder='email@example.com'
				name='email'
			/>

			<input
				{...register("password", {
					required: true,
					minLength: 6,
				})}
				className='p-3 rounded-md bg-slate-300 focus:outline-none text-slate-500'
				type='password'
				placeholder='Password'
				name='password'
			/>

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
					href={"/register"}>
					{" "}
					Sign up
				</Link>{" "}
			</p>
		</form>
	)
}

export default Login
