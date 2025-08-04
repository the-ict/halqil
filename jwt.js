import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// ✅ Token yaratish
export const generateToken = (info) => {
    return jwt.sign(
        {
            id: info.id
        },
        process.env.JWT,                          // .env dagi maxfiy kalit
        { expiresIn: "7d" }                        // token muddati
    );
};

// ✅ Tokenni tekshirish (middleware)
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token)

    if (!token) {
        console.log("demak token mavjud emas!")
        return next(createError(403, "Token topilmadi (access_token cookie)!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token yaroqsiz!"));
        req.user = user;
        next();
    });
};
