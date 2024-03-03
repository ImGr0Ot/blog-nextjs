import axios, { AxiosError } from "axios"

const BEUrl = process.env.API_URL || "http://localhost:4000"


export const registerRequest =  (user:any) => axios.post(`${BEUrl}/register`, user)
	
export const loginRequest =  (user:any) => axios.post(`${BEUrl}/login`, user)

export const getAllUsers =  () => axios.get(`${BEUrl}/users`)
	
