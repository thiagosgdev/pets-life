import { connection } from "@/infra/db/typeorm/helpers/typeorm-helper";
import "dotenv/config";
import setupRoutes from "./routes";
import express from "express";
import "reflect-metadata";

const app = express();

connection.create();

app.use(express.json());
setupRoutes(app);

export default app;
