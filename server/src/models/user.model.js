import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 6,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 6,
		},
		imgUrl: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)
export default mongoose.model("User", userSchema)
