import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
	{
		content: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		blog: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog",
			required: true,
		},
	},
	{
		timestamps: true,
	}
)
export default mongoose.model("Comment", userSchema)
