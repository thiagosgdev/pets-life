import { newConnection } from "@/infra/db/typeorm/helpers/TypeORMHelper";
import express from "express";
import "reflect-metadata";

const app = express();

newConnection();

app.use(express.json());

app.listen(3001, () => console.log("Server is runnig"));
