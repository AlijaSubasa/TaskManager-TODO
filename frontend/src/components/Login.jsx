import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Pozivamo tvoju rutu u authRoutes.js
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });

            // Ako je prijava OK, šaljemo podatke korisnika u App.js
            onLogin(res.data.user);
        } catch (err) {
            alert("Neuspješna prijava. Provjerite podatke.");
        }
    };

    return (
        <div className="login-container">
            <h1>Task Manager</h1>
            <form onSubmit={handleSubmit}>
                <h3>Prijava na sistem</h3>
                <input
                    type="text"
                    placeholder="Korisničko ime"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Lozinka"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Prijavi se</button>
            </form>
        </div>
    );
};

export default Login;