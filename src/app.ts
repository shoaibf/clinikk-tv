import * as bodyParser from "body-parser";
import * as dotEnv from "dotenv";
import express from "express";
import database from "./database/connect";
import routes from "./routes";
import errorHandler from "./utilities/errors/handler";
import middleware from "./utilities/middleware/interceptor";

dotEnv.config();
const app = express();
const databaseuri =
    "mongodb://admin:admin%40123@ds147225.mlab.com:47225/lawtorney-beta-dev";
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

database(databaseuri);
middleware(app);
routes(app);
errorHandler(app);

app.listen(port, () => console.log(`server is listening on ${port}`));
