import React, { useState } from 'react';
import axios from 'axios';

<<<<<<< HEAD
const Login = ({ onLogin }) => {
=======
const Login = ({ onLogin, switchToRegister }) => {
>>>>>>> 2c88e26 (Registracija)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
<<<<<<< HEAD
            // Pozivamo tvoju rutu u authRoutes.js
=======
>>>>>>> 2c88e26 (Registracija)
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });
<<<<<<< HEAD

            // Ako je prijava OK, šaljemo podatke korisnika u App.js
=======
>>>>>>> 2c88e26 (Registracija)
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
<<<<<<< HEAD
=======
                    value={username}
>>>>>>> 2c88e26 (Registracija)
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Lozinka"
<<<<<<< HEAD
=======
                    value={password}
>>>>>>> 2c88e26 (Registracija)
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Prijavi se</button>
            </form>
<<<<<<< HEAD
=======

            <p style={{ marginTop: '15px' }}>
                Nemaš nalog?{' '}
                <button
                    onClick={switchToRegister}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#007bff',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                >
                    Registruj se
                </button>
            </p>
>>>>>>> 2c88e26 (Registracija)
        </div>
    );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 2c88e26 (Registracija)
