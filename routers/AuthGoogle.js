import GoogleStrategy from 'passport-google-oauth20';
import User from "../models/User.js";
import passport from "passport";
import dotenv from "dotenv"

dotenv.config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error('Google authentication requires a client ID and client secret. Please set these in your environment variables.');
}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            const user = await User.findOne({ googleId: profile.id });
            if (user) {
                return cb(null, user);
            } else {
                const newUser = new User({
                    googleId: profile.id,
                    username: profile.displayName.trim(),
                    email: profile.emails[0].value,
                    profile_pic: profile.photos[0].value
                });
                await newUser.save();
                return cb(null, newUser);
            }
        } catch (error) {
            console.log(error);
            return cb(error);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, null);
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
