import { connectDB } from "./db.js";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blogs.routes.js";
import cors from "cors";

await connectDB();
const PORT = process.env.PORT || 4000;

console.log(`Server on port${PORT}`);

const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(blogRoutes);

export default app;
