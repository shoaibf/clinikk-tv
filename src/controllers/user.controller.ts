import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { WriteError } from "mongodb";
import nodemailer from "nodemailer";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { SALT_ROUNDS } from "../config/globals";
import User, { IUser } from "./../database/models/user";
import "../config/passport";



/**
 * PUT /api/signup
 * Register a user and sign in.
 */
export const Signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname
    });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.status(400).json({
                msg: "Account with that email address already exists.",
            });
        }
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.json({ msg: "success!" });
            });
        });
    });
};


/**
 * POST /api/signin
 * Verify email and password to log in
 */
export const postLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    passport.authenticate(
        "local",
        (err: Error, user: IUser, info: IVerifyOptions) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                // req.flash("errors", {msg: info.message});
                return res.json({ msg: info.message });
            }
            req.logIn(user, { session: false }, (err) => {
                if (err) {
                    return next(err);
                }
                //We don't want to store the sensitive information such as the
                //user password in the token so we pick only the email and id
                //Sign the JWT token and populate the payload with the user email and id
                const token = user.generateJWT();
                res.json({ token });
            });
        }
    )(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
export const logout = (req: Request, res: Response) => {
    req.logout();
    res.redirect("/");
};
/**
 * GET /test
 * Test route
 */
export const testRoute = (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
};