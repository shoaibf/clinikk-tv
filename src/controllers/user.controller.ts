import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { WriteError } from "mongodb";
import nodemailer from "nodemailer";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { SALT_ROUNDS } from "../config/globals";
import User, { IUser } from "./../database/models/user";

export const sendOtpEmail = (user: IUser, OTP: String): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
            user: process.env.SENDGRID_USER,
            pass: process.env.SENDGRID_PASSWORD,
        },
    });
    return new Promise((resolve, reject) => {
        const mailOptions = {
            to: user.email,
            from: "Lawtorney <Lawtorney@gmail.com>",
            subject: "Your OTP for Account Verification",
            text: `Hello,\n\nTo complete the sign in, enter the verification code.\n OTP: ${OTP} `,
        };
        transporter.sendMail(mailOptions, (err, res: Response) => {
            if (!err) {
                resolve(true);
            } else {
                reject(err);
            }
        });
    });
};
export const sendOtpMobile = (user: IUser, done: Function, OTP: String) => {};

export const generateOtp = () => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

/**
 * GET /signup
 * Signup page.
 */
export const getSignup = (req: Request, res: Response) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("account/signup", {
        title: "Create Account",
    });
};

/**
 * POST /api/sendOtp
 * Create user, send OTP and save.
 */
export const sendOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const OTP = generateOtp();
        const expires = parseInt(new Date().getTime() + 60 * 2 * 1000 + "");
        const hashOTP = bcrypt.hashSync(OTP, SALT_ROUNDS);
        const encryptedOtp = `${hashOTP}-${expires}`;
        const search: any = {};

        if (req.body.email) {
            search.email = req.body.email;
        }
        if (req.body.mobile) {
            search.mobile = req.body.mobile;
        }
        await User.findOne(search, async (err, existingAccount) => {
            try {
                if (err) {
                    return next(err);
                }

                if (existingAccount) {
                    existingAccount.otpHash = encryptedOtp;
                    if (req.body.email) {
                        await sendOtpEmail(existingAccount, OTP);
                    }
                    if (req.body.mobile) {
                        sendOtpMobile(existingAccount, next, OTP);
                    }
                    existingAccount.save((err: Function) => {
                        if (err) {
                            return next(err);
                        }

                        return res.status(400).json({
                            msg: "Please enter the OTP sent to your email",
                        });
                    });
                } else {
                    if (req.body.email) {
                        const newUser = new User({
                            email: req.body.email,
                            otpHash: encryptedOtp,
                        });
                        await sendOtpEmail(newUser, OTP);
                        newUser.save((err: Function) => {
                            if (err) {
                                return next(err);
                            }

                            return res.status(400).json({
                                msg: "Please enter the OTP sent to your email",
                            });
                        });
                    }
                    if (req.body.mobile) {
                        const newUser = new User({
                            mobile: req.body.mobile,
                            otpHash: encryptedOtp,
                        });
                        sendOtpMobile(newUser, err, OTP);
                        newUser.save((err: Function) => {
                            if (err) {
                                return next(err);
                            }

                            return res.status(400).json({
                                msg: "Please enter the OTP sent to your email",
                            });
                        });
                    }
                }
            } catch (error) {
                console.log("sendOtpMobile -> error", error);
                next(error);
            }
        });
    } catch (error) {
        next(error);
    }
};
/**
 * PUT /api/signup
 * Verify OTP and sign in.
 */
export const verifySignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.user as IUser;
    User.findOne(
        { $or: [{ email: req.body.email }, { mobile: req.body.mobile }] },
        (err, existingEmail) => {
            if (err) {
                return next(err);
            }
            const inputOtp = req.body.otp;
            const hashOtp = user.otpHash.split("-");
            const expires = hashOtp[1];
            if (
                bcrypt.compareSync(inputOtp, hashOtp[0]) &&
                new Date(parseInt(expires)) > new Date()
            ) {
                const hashPassword = bcrypt.hashSync(req.body.password, 10);
                user.password = hashPassword;
                user.mobile = req.body.mobile;
                user.save((err: WriteError) => {
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
            }
        }
    );
};

/**
 * GET /login
 * Login page.
 */
export const getLogin = (req: Request, res: Response) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("account/login", {
        title: "Login",
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
 * GET /account
 * Profile page.
 */
export const getAccount = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    User.findById(user._id, (err, user: IUser) => {
        if (err) {
            return next(err);
        }
        delete user.password;
        res.json(user);
    });
};
/**
 * GET /logout
 * Log out.
 */
export const logout = (req: Request, res: Response) => {
    req.logout();
    res.redirect("/");
};
