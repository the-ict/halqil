import express from "express"
import {logout, signin, signup} from "../controllers/Auth.js"

const router = express.Router()

// SIGNUP
router.post("/signup", signup);


// SIGN IN
router.post("/signin", signin);

// LOGOUT
router.get("/logout", logout);


export default router