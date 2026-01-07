import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ switchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Lozinke se ne poklapaju!");
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password
            });

            setMessage(res.data.message);
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Greška pri registraciji');
        }
    };

    return (
        <div className="login-container">
            <h1>Task Manager</h1>
            <form onSubmit={handleRegister}>
                <h3>Registracija</h3>
                <input
                    type="text"
                    placeholder="Korisničko ime"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Lozinka"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Potvrdi lozinku"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Registruj se</button>
            </form>

            {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}

            <p style={{ marginTop: '15px' }}>
                Već imate nalog?{' '}
                <button
                    onClick={switchToLogin}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#007bff',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                >
                    Prijavi se
                </button>
            </p>
        </div>
    );
};

export default Register;
