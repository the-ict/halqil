import connect from "./connectDb.js"
import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import multer from "multer"
import path from "path"
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import passport from "passport";
import session from "express-session";
import './routers/AuthGoogle.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

import authRouter from "./routers/Auth.js"
import commentRouter from "./routers/Comment.js"
import problemRouter from "./routers/Problems.js"
import userRouter from "./routers/User.js"


dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(session({
    secret: process.env.MY_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })


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


app.get('/google/auth',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    successRedirect: "http://localhost:5173",
  })
);

app.get("/google/me", (req, res) => {
  try {
    console.log("requesting");
    console.log(req.user);
    if (req.isAuthenticated()) {
      console.log("user informations: ", req.user);
      res.send(req.user);
    } else {
      res.send("You have'nt registreted before");
    }
  } catch (error) {
    res.status(401).json({ message: "Google informations not founded" });
  }
});

app.listen(process.env.PORT || 3000, () => {
    connect()
    console.log("Connected to SERVER!")
})
