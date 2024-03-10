import express from "express";
import { connectDB } from "./config/db";
import router from "./routes";

const app = express();
const port = 5000;

// parse JSON requests
app.use(express.json());

// parse URL-encoded data
app.use(express.urlencoded({ extended: true }))

// connect to database
connectDB();

// use `/api` as base 
app.use("/api", router)

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})
