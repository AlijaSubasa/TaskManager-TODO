const db = require('../config/db');

class User {
    static async create(username, email, password) {
        return db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password]);
    }
    static async findByUsername(username) {
        const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        return rows[0];
    }
}
module.exports = User;