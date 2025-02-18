import { createError } from "../error.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../jwt.js"
import User from "../models/User.js"

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            ...req.body,
            password: hash
        });


        await user.save();

        if (!user) return next(createError(403, "Wrong informations!"));

        const token = generateToken({ id: user._id });

        if (!token) return next(createError(403, "Token generation failed!"));

        res
            .cookie("access_token", token, { httpOnly: true, secure: true })
            .status(200)
            .json({ user });

    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isCorrect) return next(createError(403, "Wrong informations!"));

        const token = generateToken({ id: user._id });

        if (!token) return next(createError(403, "Token generation failed!"));

        const { password, ...others } = user._doc;

        res
            .cookie("access_token", token, { httpOnly: true, secure: true })
            .status(200)
            .json(others);

    } catch (error) {
        next(error);
    }
}