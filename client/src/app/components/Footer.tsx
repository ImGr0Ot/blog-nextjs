import Link from "next/link"
import React from "react"
import { SocialIcon } from "react-social-icons"
import Image from "next/image"

const Footer = () => {
	return (
		<>
			<div className='flex flex-col bottom-0 sm:pt-10 sm:bottom-0 text-slate-600 mt-4'>
				<div className='flex justify-center px-3 gap-16'>
					<SocialIcon
						style={{ height: 40, width: 40 }}
						url='www.telegram.com'
						className='w-4 h-4'
					/>

					<SocialIcon
						style={{ height: 40, width: 40 }}
						url='www.facebook.com'
						className='w-4 h-4'
					/>
					<SocialIcon
						style={{ height: 40, width: 40 }}
						url='www.linkedin.com'
						className='w-4 h-4'
					/>
				</div>
				<div className='flex justify-center items-center p-4 text-center text-slate-600'>
					© 2024 Copyright:
					<Link
						className='text-slate-600 ml-1'
						href='/'>
						Groot's Enterprise
					</Link>
					<div className='absolute right-3 pb-3'>
						<Link href={"/"}>
							<Image
								style={{ filter: "invert(70%)" }}
								className='cursor-pointer'
								src={"/GROOTLOGO-removebg--WHITE-VECTORIZADO-ARREGLADOsvg.svg"}
								width={80}
								height={80}
								alt='logo'
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default Footer
