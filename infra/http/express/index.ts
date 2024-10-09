import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import Routes from "./routes";
import { UserRepositoryMongoDB } from "infra/database/repository/UserRepositoryMongoDB";
import MongoDBAdapter from "infra/database/MongoDB";
import { StrategyJwt } from "infra/security/StrategyJwt";
import { PassportMidleware } from "../middleware/PassportMiddleware";


dotenv.config();
const server = express();

server.use(express.json());
server.use(cors({ allowedHeaders: "*", origin: "*" }));

let mongoDBAdapter = new MongoDBAdapter()
const userRepository = new UserRepositoryMongoDB(mongoDBAdapter);
const strategyJwt = new StrategyJwt(userRepository);
const passportMidleware = new PassportMidleware(strategyJwt);
server.use((req, res, next) => {
  passportMidleware.handle(req, res, next);
});
server.use(Routes);

server.listen(process.env.PORT, () => {
  console.log("🔥 Server listening on process", process.env.PORT);
});
