import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin, switchToRegister }) => {
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
            if (res.data && res.data.user) {
                onLogin(res.data.user);
            }
        } catch (err) {
            console.error(err);
            alert("Neuspješna prijava. Provjerite podatke.");
        }
    };

    return (
        <div className="login-container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Task Manager</h1>
            <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h3>Prijava na sistem</h3>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Korisničko ime"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ padding: '8px', width: '200px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        placeholder="Lozinka"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '8px', width: '200px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '8px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
                    Prijavi se
                </button>
            </form>

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
                        padding: 0,
                        font: 'inherit'
                    }}
                >
                    Registruj se
                </button>
            </p>
        </div>
    );
};

export default Login;