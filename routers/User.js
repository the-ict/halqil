import express from "express"
import User from "../models/User.js"
import { createError } from "../error.js"
import { verifyToken } from "../jwt.js"
import bcryptjs from "bcryptjs"

const router = express.Router()

// UPDATE USER
router.put("/:id", verifyToken, async (req, res, next) => {
    try {
        if (req.user.id === req.body.user_id) {
            console.log("it run");

            if (req.body.password) {
                const salt = bcryptjs.genSaltSync(10);
                const hash = bcryptjs.hashSync(req.body.password, salt);
                req.body.password = hash;
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            if (!updatedUser) return next(createError(403, "Wrong information"));

            res.status(200).json(updatedUser);
        } else {
            return next(createError(403, "Wrong informations!"));
        }
    } catch (error) {
        next(error);
    }

})

// DELETE USER
router.delete("/:id", async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json("User has been deleted!"))
    } catch (error) {
        next(error)
    }
})

// GET ONE USER
router.get("/:id", async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return next(createError(404, "User not found!"))
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

export default router