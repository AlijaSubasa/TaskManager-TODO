const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Čita ?category_id=...&status=... iz URL-a
        const { category_id, status } = req.query;

        // Šalje te parametre u model
        const tasks = await Task.getAll(userId, category_id, status);

        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Greška pri čitanju zadataka" });
    }
};

exports.addTask = async (req, res) => {
    try {
        const { title, description, category_id, user_id } = req.body;
        await Task.create(title, description, category_id, user_id);
        res.status(201).json({ message: "Zadatak dodan" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, category_id } = req.body;
        const taskId = req.params.id;

        await Task.update(taskId, title, description, status, category_id);
        res.json({ message: "Zadatak ažuriran" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.delete(req.params.id);
        res.json({ message: "Zadatak obrisan" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};