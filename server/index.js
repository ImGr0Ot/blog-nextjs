import app from "./app.js";
import { connectDB } from "./db.js";

await connectDB();
const PORT = process.env.PORT || 4000;
app.listen(PORT);
app.get("/", (res) => {
  res.send("Hello World!");
});
console.log(`Server on port${PORT}`);
