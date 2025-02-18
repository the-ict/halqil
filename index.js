import connect from "./connectDb.js"
import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import multer from "multer"
import path from "path"
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));


import authRouter from "./routers/Auth.js"
import commentRouter from "./routers/Comment.js"
import problemRouter from "./routers/Problems.js"
import userRouter from "./routers/User.js"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images")
    },
    filename: (req, file, cb) => {
        console.log("req body name: ", req.body.name)
        cb(null, req.body.name)
    }
})

const upload = multer({ storage })


dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use((err, req, res, next) => {
    console.log(err, "from middleware")
    res.status(err.status).json(err)
})

app.use("/api/test", (req, res) => {
    res.send("server is working!")
})

app.post("/api/images", upload.single("file"), (req, res) => {
    res.send("Uploaded")
})

app.use("/images", express.static(path.join(__dirname, "images")))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/comment", commentRouter)
app.use("/api/problem", problemRouter)

app.listen(process.env.PORT || 5000, () => {
    connect()
    console.log("Connected to SERVER!")
})