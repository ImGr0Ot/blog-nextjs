import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blogs.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(blogRoutes);

export default app;
