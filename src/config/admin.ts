
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "./../database/models/user";

export const isAdmin = (req: Request, res: Response, next: NextFunction) =>{
    const user = req.user as IUser;
    User.findById(user._id, (err, user: IUser) => {
        if (err) {
            return next(err);
        }
    console.log(user.role)
        if(user.role === 'Admin'){
            next();
        }else{
          return  res.status(403).send('Unauthorized');
        }
});
}
    