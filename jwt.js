import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const generateToken = (info) => {
    return jwt.sign(info, process.env.JWT)
}

export const verifyToken = (req, res, next) => {
    console.log("backend cookies: ", req.cookies)
    const token = req.cookies.access_token
    if (!token) return next(createError(403, "Wrong informations!"))

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return createError(403, "Token is not valid!")
        req.user = user
        console.log("in the jwt:", user)
        next()
    })
}