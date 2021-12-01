import "dotenv/config";
import "express-async-errors";
import setupRoutes from "./routes";
import express from "express";
import "reflect-metadata";

const app = express();

app.use(express.json());
setupRoutes(app);

export default app;
