import express from "express"
import Comment from "../models/Comment.js"
import { createError } from "../error.js"
import { verifyToken } from "../jwt.js"


const router = express.Router()


// CREATE COMMENT
router.post("/", async (req, res, next) => {
    try {
        const newComment = await Comment.create(req.body)
        if (!newComment) return next(createError(403, "Wrong information"))

        res.status(200).json(newComment)
    } catch (error) {
        next(error)
    }
})

// UPDATE COMMENT
router.put("/:id", verifyToken, async (req, res, next) => {
    try {
        if (req.user.id === req.body.comment_author) {
            const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            if (!updatedComment) return next(createError(403, "Wrong information"))

            res.status(200).json(updatedComment)
        } else {
            return next(createError(403, "Wrong informations!"))
        }
    } catch (error) {
        next(error)
    }
})

// DELETE COMMENT
router.delete("/:id", verifyToken, async (req, res, next) => {
    try {
        if (req.user.id === req.query.user_id) {
            await Comment.findByIdAndDelete(req.params.id)
                .then(() => res.status(200).json("Comment has been deleted!"))
        }
        else next(createError(403, "Wrong informations!"))
    } catch (error) {
        next(error)
    }
})

// GET COMMENTS
router.get("/all/:id", async (req, res, next) => {
    try {
        const comments = await Comment.find({ post_id: req.params.id })
        if (!comments) return next(createError(400, "Comments is empty"))

        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
})

// LIKE COMMENT
router.put("/like/:comment_id/:user_id", async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.comment_id)

        if (comment.dislikes.includes(req.params.user_id)) {
            await Comment.findByIdAndUpdate(req.params.comment_id, {
                $pull: {
                    dislikes: req.params.user_id
                }
            })
        }

        const updatedComment = await Comment.findByIdAndUpdate(req.params.comment_id, {
            $addToSet: {
                likes: req.params.user_id
            }
        }, { new: true })

        res.status(200).json(updatedComment)
    } catch (error) {
        next(error)
    }
})

// UNLIKE COMMENT
router.put("/unlike/:comment_id/:user_id", async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.comment_id)

        if (comment.likes.includes(req.params.user_id)) {
            await Comment.findByIdAndUpdate(req.params.comment_id, {
                $pull: {
                    likes: req.params.user_id
                }
            })
        }


        const updatedComment = await Comment.findByIdAndUpdate(req.params.comment_id, {
            $push: {
                dislikes: req.params.user_id
            }
        }, { new: true })

        res.status(200).json(updatedComment)
    } catch (error) {
        next(error)
    }
})

// GET post comments
router.get("/find/:post_id", async (req, res, next) => {
    try {
        const comments = await Comment.find({ post_id: req.params.post_id })
        res.status(200).json(comments)
    } catch (error) {
        console.log(error)
    }
})
export default router