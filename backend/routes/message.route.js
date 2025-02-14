import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getMessage, getUser, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route('/users').get(isAuthenticated, getUser)
router.route('/:id').get(isAuthenticated, getMessage)
router.route('/send/:id').post(isAuthenticated, sendMessage)

export default router;