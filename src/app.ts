import * as bodyParser from "body-parser";
import * as dotEnv from "dotenv";
import express from "express";
import database from "./database/connect";
import routes from "./routes";
import errorHandler from "./utilities/errors/handler";
import middleware from "./utilities/middleware/interceptor";
import passport from "passport";


const app = express();
const databaseuri =
    "mongodb://clinikk:clinikk123@ds141108.mlab.com:41108/clinikk-tv";
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(passport.initialize());

database(databaseuri);
middleware(app);
routes(app);
errorHandler(app);

app.listen(port, () => console.log(`server is listening on ${port}`));
