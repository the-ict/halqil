import express from "express"
import { create, deleteComment, dislike, getComments, getOneComment, getPostComments, like, update } from "../controllers/Comment.js"
import { verifyToken } from "../jwt.js"

const router = express.Router()

// CREATE COMMENT
router.post("/", create)

// UPDATE COMMENT
router.put("/:id", verifyToken, update)

// DELETE COMMENT
router.delete("/:id", verifyToken, deleteComment)

// GET COMMENTS
router.get("/all/:id", getComments)

// LIKE COMMENT
router.put("/like/:comment_id/:user_id", like)

// UNLIKE COMMENT
router.put("/unlike/:comment_id/:user_id", dislike)

// GET post comments
router.get("/find/:post_id", getPostComments)

// GET one comment
router.get("/:id", getOneComment)


export default router