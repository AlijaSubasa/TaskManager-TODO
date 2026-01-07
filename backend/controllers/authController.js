const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
<<<<<<< HEAD
        // Spremamo lozinku direktno, bez hashiranja
=======

        // Provjeri da li korisnik već postoji
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: "Korisnik sa tim username-om već postoji!" });
        }

>>>>>>> 2c88e26 (Registracija)
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

<<<<<<< HEAD
        // Najobičnija provjera: da li se lozinka iz baze slaže sa unesenom
=======
>>>>>>> 2c88e26 (Registracija)
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Pogrešno ime ili lozinka" });
        }

<<<<<<< HEAD
        // Vraćamo samo podatke o korisniku koji trebaju Dashboard-u
=======
>>>>>>> 2c88e26 (Registracija)
        res.json({
            user: {
                id: user.id,
                username: user.username
            }
        });
<<<<<<< HEAD
<<<<<<< HEAD
    }  catch (err) {
    // OVE DVIJE LINIJE ĆE TI REĆI SVE:
    console.log("--- DETALJI GREŠKE ---");
    console.error(err);

    res.status(500).json({ error: err.message });
}
=======
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
>>>>>>> 059a9ebaea32d79da9bd0ff70a73cb561d801a49
};
=======
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
>>>>>>> 2c88e26 (Registracija)
