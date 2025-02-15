import express from 'express';
import { checkAuth, createUser, loginUser, logoutUser, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/update-profile').put(isAuthenticated, updateProfile)
router.get('/check', isAuthenticated, checkAuth)
export default router;