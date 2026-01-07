import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
    // 1. Stanja (States)
    const [user, setUser] = useState(null);
    const [showRegister, setShowRegister] = useState(false);

    // 2. Render logika
    return (
        <div className="App">
            {!user ? (
                /* Ako korisnik nije ulogovan, biramo između Register i Login */
                showRegister ? (
                    <Register switchToLogin={() => setShowRegister(false)} />
                ) : (
                    <Login
                        onLogin={(userData) => setUser(userData)}
                        switchToRegister={() => setShowRegister(true)}
                    />
                )
            ) : (
                /* Ako je korisnik ulogovan, prikaži Dashboard */
                <Dashboard user={user} onLogout={() => setUser(null)} />
            )}
        </div>
    );
}

export default App;