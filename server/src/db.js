import mongoose from "mongoose"

export const connectDB = async () => {
	mongoose.set("strictQuery", false)
	try {
		mongoose.connect(
			"mongodb+srv://anthonyperezpantaleon:Lazaro7991@cluster.qwbbqel.mongodb.net/?retryWrites=true&w=majority"
		)
		console.log("DB is conected")
	} catch (error) {
		console.log(error)
	}
}
