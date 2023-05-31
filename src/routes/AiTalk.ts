import * as express from "express";
import { Router } from "express";
import { generateMessage } from "../controllers/aitalk";

const router: Router = express.Router();

router.post("/messages", generateMessage);

export default router;
