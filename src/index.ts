console.clear();
import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import { Express } from "express";
import * as fileUpload from "express-fileupload";
import * as bodyParser from "body-parser";
import { Server } from "http";

// Import routes
import messageRoutes from "./routes/AiTalk";
import * as cors from 'cors';



// Import middleware
import { notFound, errorHandler } from "./middlewares/errorHandler";

const { PORT } = process.env || 5050;

const app: Express = express();

// Configure Express application
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use("/api/aitalk/", messageRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const server: Server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
