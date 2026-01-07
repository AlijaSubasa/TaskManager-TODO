<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Dashboard = ({ user, onLogout }) => {
    // Podaci
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);

    // Form State (za dodavanje)
=======
=======
>>>>>>> 2c88e26 (Registracija)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ user, onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);

<<<<<<< HEAD
>>>>>>> 059a9ebaea32d79da9bd0ff70a73cb561d801a49
=======
>>>>>>> 2c88e26 (Registracija)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(1);

<<<<<<< HEAD
<<<<<<< HEAD
    // Filter State (NOVO)
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // Funkcija za učitavanje podataka (Tasks + Categories)
    // Koristimo useCallback da bismo je mogli sigurno staviti u useEffect dependency
    const loadData = useCallback(async () => {
        try {
            if (user && user.id) {
                // 1. Pripremi parametre za filtriranje
                const params = {};
                if (filterCategory) params.category_id = filterCategory;
                if (filterStatus) params.status = filterStatus;

                // 2. Poziv API-ja sa parametrima (axios to automatski pretvara u ?key=value)
                const resTasks = await axios.get(`http://localhost:5000/api/tasks/${user.id}`, {
                    params: params
                });

                // 3. Učitaj kategorije (ovo se može i optimizirati da se ne zove svaki put, ali je ok za sad)
                const resCats = await axios.get('http://localhost:5000/api/categories');

=======
=======
>>>>>>> 2c88e26 (Registracija)
    const loadData = async () => {
        try {
            // Provjera da li user postoji prije poziva
            if (user && user.id) {
                const resTasks = await axios.get(`http://localhost:5000/api/tasks/${user.id}`);
                const resCats = await axios.get('http://localhost:5000/api/categories');
<<<<<<< HEAD
>>>>>>> 059a9ebaea32d79da9bd0ff70a73cb561d801a49
=======
>>>>>>> 2c88e26 (Registracija)
                setTasks(resTasks.data);
                setCategories(resCats.data);
            }
        } catch (err) {
<<<<<<< HEAD
<<<<<<< HEAD
            console.error("Greška pri učitavanju podataka.", err);
        }
    }, [user, filterCategory, filterStatus]); // Ovisi o useru i filterima

    // Učitaj podatke kad se komponenta montira ili kad se promijene filteri/user
    useEffect(() => {
        loadData();
    }, [loadData]);
=======
=======
>>>>>>> 2c88e26 (Registracija)
            console.error("Greška pri učitavanju podataka.");
        }
    };

    useEffect(() => {
        loadData();
    }, [user]); // Dodano user kao dependency
<<<<<<< HEAD
>>>>>>> 059a9ebaea32d79da9bd0ff70a73cb561d801a49
=======
>>>>>>> 2c88e26 (Registracija)

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/tasks', {
                title,
                description,
                category_id: categoryId,
                user_id: user.id
            });
<<<<<<< HEAD
<<<<<<< HEAD
            // Reset forme
            setTitle('');
            setDescription('');
            // Osvježi listu
=======
            setTitle('');
            setDescription('');
>>>>>>> 059a9ebaea32d79da9bd0ff70a73cb561d801a49
=======
            setTitle('');
            setDescription('');
>>>>>>> 2c88e26 (Registracija)
            loadData();
        } catch (err) {
            alert("Greška pri dodavanju.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Želite li obrisati ovaj zadatak?")) {
            try {
                await axios.delete(`http://localhost:5000/api/tasks/${id}`);
                loadData();
            } catch (err) {
                alert("Greška pri brisanju.");
            }
        }
    };

    const toggleStatus = async (task) => {
        let nextStatus;
<<<<<<< HEAD
<<<<<<< HEAD
        // Rotacija statusa
=======

        // Logika za kruženje kroz statuse
>>>>>>> 059a9ebaea32d79da9bd0ff70a73cb561d801a49
=======

        // Logika za kruženje kroz statuse
>>>>>>> 2c88e26 (Registracija)
        if (task.status === 'Na čekanju') {
            nextStatus = 'U tijeku';
        } else if (task.status === 'U tijeku') {
            nextStatus = 'Završeno';
        } else {
            nextStatus = 'Na čekanju';
        }

        try {
            await axios.put(`http://localhost:5000/api/tasks/${task.id}`, {
                title: task.title,
                description: task.description || '',
<<<<<<< HEAD
<<<<<<< HEAD
                status: nextStatus,
                category_id: task.category_id
            });
            loadData();
        } catch (err) {
            console.error("Greška pri izmjeni statusa:", err);
            alert("Greška pri ažuriranju statusa.");
=======
=======
>>>>>>> 2c88e26 (Registracija)
                status: nextStatus, // Šaljemo "U tijeku" backendu
                category_id: task.category_id
            });
            loadData(); // Osvježava prikaz
        } catch (err) {
            console.error("Greška pri izmjeni statusa:", err);
            alert("Provjerite da li ste ažurirali ENUM u bazi na 'U tijeku'");
<<<<<<< HEAD
>>>>>>> 059a9ebaea32d79da9bd0ff70a73cb561d801a49
=======
>>>>>>> 2c88e26 (Registracija)
        }
    };

    return (
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="dashboard" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* HEADER */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Moji Zadaci (Korisnik: {user.username})</h2>
                <button onClick={onLogout} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px' }}>
=======
=======
>>>>>>> 2c88e26 (Registracija)
        <div className="dashboard">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Moji Zadaci (Korisnik: {user.username})</h2>
                <button onClick={onLogout} style={{ background: '#666', color: 'white', padding: '5px 10px' }}>
<<<<<<< HEAD
>>>>>>> 059a9ebaea32d79da9bd0ff70a73cb561d801a49
=======
>>>>>>> 2c88e26 (Registracija)
                    Odjavi se
                </button>
            </header>

<<<<<<< HEAD
<<<<<<< HEAD
            <hr style={{ marginBottom: '20px' }} />

            {/* FORMA ZA DODAVANJE */}
            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
                <h3>Dodaj novi zadatak</h3>
                <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Naslov zadatka"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ padding: '8px' }}
                    />
                    <input
                        type="text"
                        placeholder="Opis (opciono)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ padding: '8px' }}
                    />
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        style={{ padding: '8px' }}
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <button type="submit" style={{ padding: '8px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Dodaj
                    </button>
                </form>
            </div>

            {/* SEKCIJA ZA FILTRIRANJE (NOVO) */}
            <div style={{ background: '#e9ecef', padding: '10px', borderRadius: '5px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <strong>Filtriraj:</strong>

                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{ padding: '5px' }}
                >
                    <option value="">Sve kategorije</option>
=======
=======
>>>>>>> 2c88e26 (Registracija)
            <hr />

            <form onSubmit={handleAddTask} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Naslov zadatka"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Opis (opciono)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
<<<<<<< HEAD
>>>>>>> 059a9ebaea32d79da9bd0ff70a73cb561d801a49
=======
>>>>>>> 2c88e26 (Registracija)
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
<<<<<<< HEAD
<<<<<<< HEAD

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ padding: '5px' }}
                >
                    <option value="">Svi statusi</option>
                    <option value="Na čekanju">Na čekanju</option>
                    <option value="U tijeku">U tijeku</option>
                    <option value="Završeno">Završeno</option>
                </select>
            </div>

            {/* TABELA ZADATAKA */}
            <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <thead>
                <tr style={{ background: '#343a40', color: 'white' }}>
                    <th style={{ padding: '10px' }}>Zadatak</th>
                    <th style={{ padding: '10px' }}>Kategorija</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px' }}>Akcije</th>
                </tr>
                </thead>
                <tbody>
                {tasks.length === 0 ? (
                    <tr>
                        <td colSpan="4" style={{ padding: '15px', textAlign: 'center' }}>Nema zadataka za prikaz.</td>
                    </tr>
                ) : (
                    tasks.map(task => (
                        <tr key={task.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px' }}>
                                <strong style={{ fontSize: '1.1em' }}>{task.title}</strong>
                                <br />
                                <small style={{ color: '#666' }}>{task.description}</small>
                            </td>
                            <td style={{ padding: '10px' }}>{task.category_name || 'Nema kategorije'}</td>
                            <td style={{
                                padding: '10px',
                                color: task.status === 'Završeno' ? 'green' :
                                    task.status === 'U tijeku' ? '#d35400' : 'red', // Malo tamnija narančasta za bolji kontrast
                                fontWeight: 'bold'
                            }}>
                                {task.status}
                            </td>
                            <td style={{ padding: '10px' }}>
                                <button
                                    onClick={() => toggleStatus(task)}
                                    style={{ marginRight: '5px', padding: '5px 10px', cursor: 'pointer' }}
                                >
                                    Status
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(task.id)}
                                    style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}
                                >
                                    Obriši
                                </button>
                            </td>
                        </tr>
                    ))
                )}
=======
=======
>>>>>>> 2c88e26 (Registracija)
                <button type="submit">Dodaj zadatak</button>
            </form>

            <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ background: '#f4f4f4' }}>
                    <th>Zadatak</th>
                    <th>Kategorija</th>
                    <th>Status</th>
                    <th>Akcije</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                        <td style={{ padding: '10px' }}>
                            <strong>{task.title}</strong>
                            <br/>
                            <small>{task.description}</small>
                        </td>
                        <td>{task.category_name || 'Nema kategorije'}</td>
                        <td style={{
                            color: task.status === 'Završeno' ? 'green' :
                                task.status === 'U tijeku' ? 'orange' : 'red',
                            fontWeight: 'bold'
                        }}>
                            {task.status}
                        </td>
                        <td>
                            <button onClick={() => toggleStatus(task)}>
                                Promijeni status
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(task.id)}
                                style={{ marginLeft: '10px' }}
                            >
                                Obriši
                            </button>
                        </td>
                    </tr>
                ))}
<<<<<<< HEAD
>>>>>>> 059a9ebaea32d79da9bd0ff70a73cb561d801a49
=======
>>>>>>> 2c88e26 (Registracija)
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;