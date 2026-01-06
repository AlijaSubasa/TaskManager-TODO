    const Category = require('../models/Category');


    exports.getCategories = async (req, res) => {
        try {
            const categories = await Category.getAll();
            res.json(categories); // Šalje podatke nazad kao listu
        } catch (err) {
            res.status(500).json({ error: "Greška pri čitanju kategorija" });
        }
    };