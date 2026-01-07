const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


// 1. Uvezi rute
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // OVO JE FALILO

// 2. Koristi rute
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes); // OVO JE FALILO

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));