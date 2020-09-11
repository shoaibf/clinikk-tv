
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "./../database/models/user";

export const isAdmin = (req: Request, res: Response, next: NextFunction) =>{
    const user = req.user as IUser;

        if(user.role == 'Admin'){
            next();
        }else{
            res.status(403).send('Unauthorized');
        }
    }
