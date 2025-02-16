import connect from "./connectDb.js"
import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"


import authRouter from "./routers/Auth.js"
import commentRouter from "./routers/Comment.js"
import problemRouter from "./routers/Problems.js"
import userRouter from "./routers/User.js"

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

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/comment", commentRouter)
app.use("/api/problem", problemRouter)

app.listen(process.env.PORT || 5000, () => {
    connect()
    console.log("Connected to SERVER!")
})