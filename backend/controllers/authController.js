const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Spremamo lozinku direktno, bez hashiranja
        await User.create(username, email, password);
        res.status(201).json({ message: "Korisnik registrovan!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);

        // Najobičnija provjera: da li se lozinka iz baze slaže sa unesenom
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Pogrešno ime ili lozinka" });
        }

        // Vraćamo samo podatke o korisniku koji trebaju Dashboard-u
        res.json({
            user: {
                id: user.id,
                username: user.username
            }
        });
    }  catch (err) {
    // OVE DVIJE LINIJE ĆE TI REĆI SVE:
    console.log("--- DETALJI GREŠKE ---");
    console.error(err);

    res.status(500).json({ error: err.message });
}
};