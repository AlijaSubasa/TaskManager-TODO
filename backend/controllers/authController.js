const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Provjeri da li korisnik već postoji
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: "Korisnik sa tim username-om već postoji!" });
        }

        // 2. Kreiraj korisnika (lozinka se sprema direktno prema tvom zahtjevu)
        await User.create(username, email, password);

        res.status(201).json({ message: "Korisnik registrovan!" });
    } catch (err) {
        console.error("Greška pri registraciji:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Pronađi korisnika u bazi
        const user = await User.findByUsername(username);

        // 2. Najobičnija provjera lozinke (plain text)
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Pogrešno ime ili lozinka" });
        }

        // 3. Vraćamo podatke koji trebaju Dashboard-u
        res.json({
            user: {
                id: user.id,
                username: user.username
            }
        });

    } catch (err) {
        // Detaljan ispis greške u konzoli servera radi lakšeg debugginga
        console.log("--- DETALJI GREŠKE ---");
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};