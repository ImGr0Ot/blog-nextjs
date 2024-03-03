import Link from "next/link"
import React from "react"

const Categories = () => {
	return (
		<>
			<h1 className='font-bold mx-20 mt-10 mb-5 text-center '>
				{" "}
				Popular Categories
			</h1>

			<div className='pl-10  inline-grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-center gap-8'>
				<Link
					href={"/"}
					className='bg-red-200 rounded-xl p-2 w-30 h-10 text-center'>
					Education
				</Link>
				<Link
					href={"/"}
					className='bg-amber-200 rounded-xl p-2 w-30 h-10 text-center'>
					Tecnology
				</Link>

				<Link
					href={"/"}
					className='bg-green-200 rounded-xl p-2 w-28 h-10 text-center'>
					Sport
				</Link>
				<Link
					href={"/"}
					className='bg-indigo-200 rounded-xl p-2 w-28 h-10 text-center'>
					Art
				</Link>

				<Link
					href={"/"}
					className='bg-pink-200 rounded-xl p-2 w-28 h-10 text-center'>
					Fashion
				</Link>
				<Link
					href={"/"}
					className='bg-purple-200 rounded-xl p-2 w-28 h-10 text-center'>
					Other
				</Link>
			</div>
		</>
	)
}

export default Categories
