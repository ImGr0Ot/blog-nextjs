"use client"
import { Dispatch, SetStateAction, createContext, useState } from "react"
import { loginRequest, registerRequest } from "../api/user"

export type User = {
	_id: String
	username: String
	email: String
	password: String
	imgUrl: String
}

export interface userContextInterface {
	user: User
	setUser: Dispatch<SetStateAction<User>>
	isAuthenticated: Boolean
	setIsAuthenticated: Dispatch<SetStateAction<Boolean>>
	pageName: String
	setPageName: Dispatch<SetStateAction<String>>
	registerUser: (user: User) => Promise<unknown>
	loginUser: (user: User) => Promise<unknown>
}

type Props = {
	children: React.ReactNode
}

const defaultState: userContextInterface = {
	user: { _id: "", username: "", email: "", password: "", imgUrl: "" },
	setUser: () => {},
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	pageName: "Home",
	setPageName: () => {},
	registerUser: async (user: User) => {},
	loginUser: async (user: User) => {},
}

export const UserContext = createContext(defaultState)

export function UserProvider({ children }: Props) {
	const [user, setUser] = useState<User>(defaultState.user)
	const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(
		defaultState.isAuthenticated
	)
	const [pageName, setPageName] = useState<String>(defaultState.pageName)

	const registerUser = async (user: User) => {
		console.log("registering user")
		try {
			const res = await registerRequest(user)
			setUser(res.data)
			setIsAuthenticated(true)
		} catch (error) {
			console.log(error)
			return error
		}
	}
	const loginUser = async (user: User) => {
		try {
			const res = await loginRequest(user)
			setUser(res.data)
			setIsAuthenticated(true)
		} catch (error) {
			console.log(error)
			return error
		}
	}
	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				isAuthenticated,
				setIsAuthenticated,
				registerUser,
				loginUser,
				pageName,
				setPageName,
			}}>
			{children}
		</UserContext.Provider>
	)
}
