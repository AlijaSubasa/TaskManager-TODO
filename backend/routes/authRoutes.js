const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta za registraciju novog korisnika
// Putanja: POST /api/auth/register
router.post('/register', authController.register);

// Ruta za prijavu (Login forma)
// Putanja: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;