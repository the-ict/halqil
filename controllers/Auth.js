import { createError } from "../error.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../jwt.js"
import User from "../models/User.js"

export const signup = async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return next(createError(400, "Username and password are required!"));
    }
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

        console.log("Generated token:", token);

        if (!token) return next(createError(403, "Token generation failed!"));

        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 kun
        })
            .status(200)
            .json(user);

    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return next(createError(400, "Username and password are required!"));
    }
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isCorrect) return next(createError(403, "Wrong informations!"));

        const token = generateToken({ id: user._id });

        if (!token) return next(createError(403, "Token generation failed!"));

        const { password, ...others } = user._doc;

        res
            .cookie("access_token", token, {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 kun
            })
            .status(200)
            .json(others);

    } catch (error) {
        next(error);
    }
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json("Logged out successfully.");
};
