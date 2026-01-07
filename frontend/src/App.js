import React, { useState } from 'react';
import Login from './components/Login';
<<<<<<< HEAD
=======
import Register from './components/Register';
>>>>>>> 2c88e26 (Registracija)
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
<<<<<<< HEAD
  // Stanje u kojem čuvamo ulogovanog korisnika
  const [user, setUser] = useState(null);

  return (
      <div className="App">
        {!user ? (
            // Ako nema korisnika, prikaži Login
            <Login onLogin={(userData) => setUser(userData)} />
        ) : (
            // Ako je korisnik ulogovan, prikaži Dashboard
            <Dashboard user={user} onLogout={() => setUser(null)} />
        )}
      </div>
  );
}

export default App;
=======
    const [user, setUser] = useState(null);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className="App">
            {!user ? (
                showRegister ? (
                    <Register switchToLogin={() => setShowRegister(false)} />
                ) : (
                    <Login
                        onLogin={(userData) => setUser(userData)}
                        switchToRegister={() => setShowRegister(true)}
                    />
                )
            ) : (
                <Dashboard user={user} onLogout={() => setUser(null)} />
            )}
        </div>
    );
}

export default App;
>>>>>>> 2c88e26 (Registracija)
