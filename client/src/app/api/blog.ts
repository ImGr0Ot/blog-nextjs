import axios from "axios"

const BEUrl = process.env.API_URL || "http://localhost:4000"

export const getBlogs = async () => axios.get(`${BEUrl}/blogs`)
export const getBlog = async (id: string) => axios.get(`${BEUrl}/blog/${id}`)


//create a blog
export const blogRequest = (blog:any) => {
	
	

	try {
		axios.post(`${BEUrl}/blogs`, blog)
	} catch (error) {
		console.log(error)
	}
}

export const getComments = async (blogId: string) => axios.get(`${BEUrl}/comments/${blogId}`)

export const commentRequest = (comment:any) => axios.post(`${BEUrl}/comment`, comment)
    

