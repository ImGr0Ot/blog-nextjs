import { z } from "zod"

export const createBlogSchema = z.object({
	title: z.string({
		required_error: "Title is required",
	}),
	text: z.string(),
	date: z.string().datetime().optional(),
})
