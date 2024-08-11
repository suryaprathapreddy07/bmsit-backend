const express = require('express');
const router = express.Router();
const { createClub, getAllClubs, getClubById } = require('./clubs.controller');
const { checkToken } = require('../../middlewares/auth/tokenValidation');
const { adminMiddleware } = require('../../middlewares/RBAC/permissions');
const multer = require('multer');
const upload = multer();

// Route to create a new club
router.post('/',upload.single('image'),checkToken,adminMiddleware ,createClub);

// Route to get all clubs
router.get('/',checkToken, getAllClubs);

// Route to get a club by ID
router.get(' /:id',checkToken, getClubById);

module.exports = router;