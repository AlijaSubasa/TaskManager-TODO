import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Dashboard = ({ user, onLogout }) => {
    // Podaci
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);

    // Form State (za dodavanje)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(1);

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

                setTasks(resTasks.data);
                setCategories(resCats.data);
            }
        } catch (err) {
            console.error("Greška pri učitavanju podataka.", err);
        }
    }, [user, filterCategory, filterStatus]); // Ovisi o useru i filterima

    // Učitaj podatke kad se komponenta montira ili kad se promijene filteri/user
    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/tasks', {
                title,
                description,
                category_id: categoryId,
                user_id: user.id
            });
            // Reset forme
            setTitle('');
            setDescription('');
            // Osvježi listu
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
        // Rotacija statusa
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
                status: nextStatus,
                category_id: task.category_id
            });
            loadData();
        } catch (err) {
            console.error("Greška pri izmjeni statusa:", err);
            alert("Greška pri ažuriranju statusa.");
        }
    };

    return (
        <div className="dashboard" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* HEADER */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Moji Zadaci (Korisnik: {user.username})</h2>
                <button onClick={onLogout} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px' }}>
                    Odjavi se
                </button>
            </header>

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
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

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
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;