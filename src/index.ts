import express from "express";
import cors from "cors";
import routes from "./routes";
import compression from 'compression'

const app = express();
app.use(express.json());
app.use(cors());
app.use(compression(/*  */))
app.use(routes);

export { app };
