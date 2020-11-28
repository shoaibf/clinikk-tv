import { Application, NextFunction, Request, Response } from "express";
import Auth from "./auth";
import User from "./user";
import Videos from "./videos" 

export default (app: Application) => {
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        res.send({
            message:
                "welcome to clinikk app",
        });
    });

    app.use("/api", User);
    app.use("/api", Videos);
    app.use("/api", Auth);
};
