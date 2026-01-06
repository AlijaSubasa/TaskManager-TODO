const db = require('../config/db');

class Category {
    // Dohvaća sve kategorije kako bismo ih prikazali u <select> meniju na frontendu
    static async getAll() {
        const [rows] = await db.execute("SELECT * FROM categories");
        return rows;
    }
}

module.exports = Category;