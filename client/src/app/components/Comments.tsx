"use client"
import Link from "next/link"
import React from "react"
import Image from "next/image"


import { useSession } from "next-auth/react"

const Comments = () => {
	const { data: session, status } = useSession()
	return (
		<>
			<div>
				<h1 className='text-3xl mt-10 mb-5'> Comments</h1>

				{status === "authenticated" ? (
					<div className='flex flex-col sm:flex sm:flex-row gap-3 items-center'>
						<textarea
							cols={25}
							rows={5}
							name='textAreaComments'
							id='textAreaComments'
							placeholder='Write your comment here...'
							className='rounded-xl focus:outline-none p-2'></textarea>

						<button className='flex justify-end sm:mt-24 bg-slate-500 hover:bg-slate-700 text-white rounded-full p-2 px-4'>
							Send
						</button>
					</div>
				) : (
					<Link href='/Login'> Login to Write a comment </Link>
				)}
				{/*Comments!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
				<div className='flex flex-col gap-8 mt-10'>
					<div className='flex flex-col bg-white rounded-xl p-2'>
						<div className='flex items-center'>
							<Image
								className='rounded-full'
								src={"/icon-image.jpg"}
								width={36}
								height={36}
								alt='Picture of the author'
							/>
							<span className='ml-2'>- Ceo of Groot's Enterprise</span>
						</div>
						<p className='p-3'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cum
							nesciunt natus facere necessitatibus. Animi modi excepturi
							deserunt esse molestias at, natus laboriosam adipisci voluptatem,
							commodi saepe qui, cupiditate iure?
						</p>
					</div>
					<div className='flex flex-col bg-white rounded-xl p-2'>
						<div className='flex items-center'>
							<Image
								className='rounded-full'
								src={"/icon-image.jpg"}
								width={36}
								height={36}
								alt='Picture of the author'
							/>
							<span className='ml-2'>- Ceo of Groot's Enterprise</span>
						</div>
						<p className='p-3'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cum
							nesciunt natus facere necessitatibus. Animi modi excepturi
							deserunt esse molestias at, natus laboriosam adipisci voluptatem,
							commodi saepe qui, cupiditate iure?
						</p>
					</div>
					<div className='flex flex-col bg-white rounded-xl p-2'>
						<div className='flex items-center'>
							<Image
								className='rounded-full'
								src={"/icon-image.jpg"}
								width={36}
								height={36}
								alt='Picture of the author'
							/>
							<span className='ml-2'>- Ceo of Groot's Enterprise</span>
						</div>
						<p className='p-3'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cum
							nesciunt natus facere necessitatibus. Animi modi excepturi
							deserunt esse molestias at, natus laboriosam adipisci voluptatem,
							commodi saepe qui, cupiditate iure?
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Comments
