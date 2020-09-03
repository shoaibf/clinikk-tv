import { Application, NextFunction, Request, Response } from "express";
import Auth from "./auth";
import User from "./user";

export default (app: Application) => {
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        res.send({
            message:
                "welcome to typescript-node-express boilerplate API (v1.0.0)",
        });
    });

    app.use("/user", User);
    app.use("/auth", Auth);
};
