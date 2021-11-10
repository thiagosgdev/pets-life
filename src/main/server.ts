import { connection } from "@/infra/db/typeorm/helpers/typeorm-helper";
//import createConnection from "@/infra/db/typeorm/helpers/typeorm-helper";
import "dotenv/config";
import express from "express";
import "reflect-metadata";

const app = express();

//createConnection();

connection.create();

app.use(express.json());

app.listen(3001, () => console.log("Server is runnig"));
