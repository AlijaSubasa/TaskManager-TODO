import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ user, onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(1);

    const loadData = async () => {
        try {
            // Provjera da li user postoji prije poziva
            if (user && user.id) {
                const resTasks = await axios.get(`http://localhost:5000/api/tasks/${user.id}`);
                const resCats = await axios.get('http://localhost:5000/api/categories');
                setTasks(resTasks.data);
                setCategories(resCats.data);
            }
        } catch (err) {
            console.error("Greška pri učitavanju podataka.");
        }
    };

    useEffect(() => {
        loadData();
    }, [user]); // Dodano user kao dependency

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/tasks', {
                title,
                description,
                category_id: categoryId,
                user_id: user.id
            });
            setTitle('');
            setDescription('');
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

        // Logika za kruženje kroz statuse
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
                status: nextStatus, // Šaljemo "U tijeku" backendu
                category_id: task.category_id
            });
            loadData(); // Osvježava prikaz
        } catch (err) {
            console.error("Greška pri izmjeni statusa:", err);
            alert("Provjerite da li ste ažurirali ENUM u bazi na 'U tijeku'");
        }
    };

    return (
        <div className="dashboard">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Moji Zadaci (Korisnik: {user.username})</h2>
                <button onClick={onLogout} style={{ background: '#666', color: 'white', padding: '5px 10px' }}>
                    Odjavi se
                </button>
            </header>

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
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
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
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;