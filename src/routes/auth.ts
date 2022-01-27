import express from 'express';

import * as authController from '../controllers/auth';

const router = express.Router();

router.post('/signup', authController.signUp);

router.post('/login', authController.login);

// For testing purposes only
router.get('/users', authController.getUsers);

export default router;