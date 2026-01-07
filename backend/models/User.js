const db = require('../config/db');

class User {
    static async create(username, email, password) {
<<<<<<< HEAD
        return db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password]);
    }
    static async findByUsername(username) {
        const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        return rows[0];
    }
}
module.exports = User;
=======
        // Spremamo lozinku direktno, bez hashiranja
        return db.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, password]
        );
    }

    static async findByUsername(username) {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        return rows[0];
    }
}

module.exports = User;
>>>>>>> 2c88e26 (Registracija)
