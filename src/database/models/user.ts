import mongoose, { Document } from 'mongoose'
import userSchema from './../schema/user'
import * as bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";

export interface IUser extends Document {
  email: string;
    mobile: string;
    password: string;
    resetToken: string;
    tokens: string;
    isVerified: number;
    isActive: string;
    role: string;
    otpHash: string;
    orders: [{
      orderId: string;
      orderName: string;
      orderStatus: number;
    }];
    profile: {
      name: string;
      gender: string;
      location: string;
      website: string;
      picture: string;
    };
    generateJWT: generateJWTFunction;

}
type generateJWTFunction = () => string;

userSchema.pre("save", function save(next) {
  const user = this as IUser;
  if (!user.isModified("password")) {
      return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
      if (err) {
          return next(err);
      }
      bcrypt.hash(
          user.password,
          salt,
          (err: mongoose.Error, hash) => {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          }
      );
  });
});

userSchema.methods.comparePassword = function (
candidatePassword: string,
cb: (err: any, isMatch: any) => void
) {
bcrypt.compare(
    candidatePassword,
    this.password,
    (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    }
);
};

const generateJWT: generateJWTFunction = function (this: any) {
    const body = { _id: this._id, email: this.email };
    const token = sign({ user: body }, process.env.JWT_SECRET as string);
    return token;
};

userSchema.methods.generateJWT = generateJWT;

export default mongoose.model<IUser>('User', userSchema)