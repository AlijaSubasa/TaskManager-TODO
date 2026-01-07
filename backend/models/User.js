const db = require('../config/db');

class User {
    // Kreira novog korisnika
    static async create(username, email, password) {
        // Spremamo lozinku direktno, bez hashiranja (plain text)
        return db.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, password]
        );
    }

    // Pronalazi korisnika po korisničkom imenu
    static async findByUsername(username) {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        return rows[0];
    }
}

module.exports = User;