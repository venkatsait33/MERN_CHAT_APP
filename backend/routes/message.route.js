import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route('/users').get(isAuthenticated)

export default router;