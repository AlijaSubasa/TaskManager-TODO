const Task = require('../models/Task');

// 1. Dobavljanje zadataka (sa podrškom za filtere)
exports.getTasks = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Čitamo query parametre iz URL-a (npr. ?category_id=1&status=U tijeku)
        const { category_id, status } = req.query;

        // Šaljemo parametre u model Task.getAll
        const tasks = await Task.getAll(userId, category_id, status);

        res.json(tasks);
    } catch (err) {
        console.error("Greška u getTasks:", err);
        res.status(500).json({ error: "Greška pri čitanju zadataka" });
    }
};

// 2. Dodavanje novog zadatka
exports.addTask = async (req, res) => {
    try {
        const { title, description, category_id, user_id } = req.body;

        if (!title || !user_id) {
            return res.status(400).json({ error: "Naslov i user_id su obavezni" });
        }

        await Task.create(title, description, category_id, user_id);
        res.status(201).json({ message: "Zadatak uspješno dodan" });
    } catch (err) {
        console.error("Greška u addTask:", err);
        res.status(500).json({ error: err.message });
    }
};

// 3. Ažuriranje zadatka (uključujući promjenu statusa)
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, category_id } = req.body;
        const taskId = req.params.id;

        await Task.update(taskId, title, description, status, category_id);
        res.json({ message: "Zadatak uspješno ažuriran" });
    } catch (err) {
        console.error("Greška u updateTask:", err);
        res.status(500).json({ error: err.message });
    }
};

// 4. Brisanje zadatka
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.delete(taskId);
        res.json({ message: "Zadatak uspješno obrisan" });
    } catch (err) {
        console.error("Greška u deleteTask:", err);
        res.status(500).json({ error: err.message });
    }
};