const db = require('../config/db');

class Task {

    // 1. Dohvaćanje zadataka uz filtriranje
    static async getAll(userId, categoryId = null, status = null) {
        let sql = `
            SELECT t.*, c.name as category_name
            FROM tasks t
                     LEFT JOIN categories c ON t.category_id = c.id
            WHERE t.user_id = ?
        `;

        const params = [userId];

        // Ako je odabrana kategorija, dodaj u SQL
        if (categoryId && categoryId !== '') {
            sql += " AND t.category_id = ?";
            params.push(categoryId);
        }

        // Ako je odabran status, dodaj u SQL
        if (status && status !== '') {
            sql += " AND t.status = ?";
            params.push(status);
        }

        const [rows] = await db.execute(sql, params);
        return rows;
    }

    // 2. Kreiranje zadatka (Postavlja default status na 'Na čekanju')
    static async create(title, description, category_id, user_id) {
        return db.execute(
            "INSERT INTO tasks (title, description, category_id, user_id, status) VALUES (?, ?, ?, ?, 'Na čekanju')",
            [title, description, category_id, user_id]
        );
    }

    // 3. Ažuriranje (Uključujući status)

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


    // 4. Brisanje

    static async delete(id) {
        return db.execute("DELETE FROM tasks WHERE id = ?", [id]);
    }
}


module.exports = Task;