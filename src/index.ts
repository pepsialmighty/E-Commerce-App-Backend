import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import dbConnect from "../config/dbConnect";
import router from "../routes/authRoute";
import bodyParser from "body-parser";

import { errorHandler, notFound } from "./../middlewares/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const authRouter = router;

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
