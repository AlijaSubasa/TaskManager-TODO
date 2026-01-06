const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET - Lista svih kategorija iz baze
// Putanja: GET /api/categories
router.get('/', categoryController.getCategories);

module.exports = router;