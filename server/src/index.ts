import express, { Request, Response } from "express";

const app = express();
const port = 5000;

// parse JSON requests
app.use(express.json());

// parse URL-encoded data
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send("Hello, World!")
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})
