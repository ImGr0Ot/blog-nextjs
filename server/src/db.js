import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    if (mongoose.connections[0].readyState == 1) {
      console.log("DB is already conected");
      return;
    } else {
      await mongoose.connect(
        "mongodb+srv://anthonyperezpantaleon:Lazaro7991@cluster.qwbbqel.mongodb.net/?retryWrites=true&w=majority"
      );
      console.log("DB is conected");
    }
  } catch (error) {
    console.log(error.message);
  }
};
