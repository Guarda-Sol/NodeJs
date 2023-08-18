const express = require('express');
const { Pool } = require('pg');
const path = require('path'); // For serving static files
const frontend = require('./frontend'); // Import frontend logic

const app = express();
const port = 3000;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public'))); // Serve static files

const connectionString = process.env.DATABASE_URL;


const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
        ca: undefined
    }
});

// Endpoint to fetch user data
app.get('/user', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.mydjangoapp_usuario');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Erro ao buscar dados de usuários no banco de dados.');
        console.error(err);
    }
});
app.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
        SELECT u.nome as username, c.texto as comment 
        FROM mydjangoapp_comentario c
        JOIN public.mydjangoapp_usuario u ON c.usuario_id = u.id
        ORDER BY c.data_publicacao DESC
        `);
        res.send(frontend.renderComments(result.rows));
    } catch (err) {
        res.status(500).send('Erro ao buscar comentários no banco de dados.');
        console.error(err);
    }
});

app.post('/', async (req, res) => {
    try {
        const usuario_id = 2; // Hardcoded for now
        const { texto } = req.body;
        const result = await pool.query('INSERT INTO public.mydjangoapp_comentario (usuario_id, texto) VALUES ($1, $2) RETURNING *', [usuario_id, texto]);
        res.redirect('/');  // Redirect back to the main page
    } catch (err) {
        res.status(500).send('Error adding the comment.');
        console.error(err);
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
