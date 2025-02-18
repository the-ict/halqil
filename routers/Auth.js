import express from "express"
import {signin, signup} from "../controllers/Auth.js"

const router = express.Router()

// SIGNUP
router.post("/signup", signup);


// SIGN IN
router.post("/signin", signin);



export default router