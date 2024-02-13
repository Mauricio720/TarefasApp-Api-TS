import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import Routes from "./routes";


dotenv.config();
const server = express();

server.use(express.json());
server.use(cors({ allowedHeaders: "*", origin: "*" }));
server.use(Routes);

server.listen(process.env.PORT, () => {
  console.log("🔥 Server listening on process", process.env.PORT);
});
