const Task = require('../models/Task');

exports.getTasks = async (req, res) => {

    const tasks = await Task.getAll(req.params.userId);
    res.json(tasks);
};

exports.addTask = async (req, res) => {

    const { title, description, category_id, user_id } = req.body;
    await Task.create(title, description, category_id, user_id);
    res.status(201).json({ message: "Dodano" });
};


exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, category_id } = req.body;
        const taskId = req.params.id; // Ovo uzima ID iz /api/tasks/:id

        await Task.update(taskId, title, description, status, category_id);
        res.json({ message: "Ažurirano" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    await Task.delete(req.params.id);
    res.json({ message: "Obrisano" });
};