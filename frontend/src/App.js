import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
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