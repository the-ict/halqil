import express from "express"
import { verifyToken } from "../jwt.js"
import { update, deleteUser, getUser } from "../controllers/User.js"

const router = express.Router()

// UPDATE USER
router.put("/:id", verifyToken, update)

// DELETE USER
router.delete("/:id", verifyToken, deleteUser)

// GET ONE USER
router.get("/:id", getUser)

export default router