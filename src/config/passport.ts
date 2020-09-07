import passport from "passport";
import passportLocal from "passport-local";
import {
    Strategy as JwtStrategy,
    ExtractJwt,
    VerifiedCallback,
} from "passport-jwt";

import User, { IUser } from './../database/models/user';
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        User.findOne({ $or: [{ email: email }, { mobile: email }] }, (err, user: any) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(undefined, false, {
                    message: `User with ${email} not found.`,
                });
            }
            user.comparePassword(password, (err: Error, isMatch: boolean) => {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(undefined, user);
                }
                return done(undefined, false, {
                    message: "Invalid email or password.",
                });
            });
        });
    })
);

//This verifies that the token sent by the user is valid
passport.use(
    new JwtStrategy(
        {
            //secret we used to sign our JWT
            secretOrKey: process.env.JWT_SECRET,
            //we expect the user to send the token as a query parameter with the name 'secret_token'
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                //Pass the user details to the next middleware
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

/**
 * Login Required middleware.
 */
export const isAuthenticated = passport.authenticate("jwt", { session: false });
