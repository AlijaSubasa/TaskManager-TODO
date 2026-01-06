const db = require('../config/db');

class Task {
    static async getAll(userId) {
        const [rows] = await db.execute(
            "SELECT t.*, c.name as category_name FROM tasks t LEFT JOIN categories c ON t.category_id = c.id WHERE t.user_id = ?",
            [userId]
        );
        return rows;
    }
    static async create(title, description, category_id, user_id) {
        return db.execute(
            "INSERT INTO tasks (title, description, category_id, user_id) VALUES (?, ?, ?, ?)",
            [title, description, category_id, user_id]
        );
    }
    static async update(id, title, description, status, category_id) {
        return db.execute(
            "UPDATE tasks SET title=?, description=?, status=?, category_id=? WHERE id=?",
            [title, description, status, category_id, id]
        );
    }
    static async delete(id) {
        return db.execute("DELETE FROM tasks WHERE id = ?", [id]);
    }
}
module.exports = Task;