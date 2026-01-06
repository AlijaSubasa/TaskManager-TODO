const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// 1. GET - Dohvati sve zadatke za određenog korisnika
router.get('/:userId', taskController.getTasks);

// 2. POST - Kreiraj novi zadatak (Punjenje baze preko forme)
router.post('/', taskController.addTask);

// 3. PUT - Ažuriraj status zadatka (npr. iz 'todo' u 'done')
router.put('/:id', taskController.updateTask);

// 4. DELETE - Obriši zadatak
router.delete('/:id', taskController.deleteTask);

module.exports = router;