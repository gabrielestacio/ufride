const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Importa nossa configuração do banco

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// --- API Endpoints com Banco de Dados ---

// POST /api/register
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Tentativa de cadastro para: ${email}`);

    // NOTA DE SEGURANÇA: Em um app real, a senha NUNCA deve ser salva em texto puro.
    // Use uma biblioteca como 'bcrypt' para fazer o hash da senha antes de salvar.
    
    try {
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
            [name, email, password]
        );
        console.log('Usuário cadastrado com sucesso no DB com ID:', result.rows[0].id);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        if (error.code === '23505') { // Código de erro para violação de constraint 'unique'
            return res.status(409).json({ message: 'Este email já está cadastrado.' });
        }
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// POST /api/login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Tentativa de login para: ${email}`);

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        // Em um app real, compararíamos a senha com hash: const match = await bcrypt.compare(password, user.password);
        if (password === user.password) {
            console.log(`Login bem-sucedido para o usuário ID: ${user.id}`);
            res.status(200).json({ message: 'Login bem-sucedido!', token: 'fake-jwt-token-12345', userId: user.id });
        } else {
            res.status(401).json({ message: 'Email ou senha inválidos.' });
        }
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// POST /api/rides
app.post('/api/rides', async (req, res) => {
    const { origin, destination, rideDate, price, seats, userId } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO rides (origin, destination, ride_date, price, seats, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [origin, destination, rideDate, price, seats, userId]
        );
        console.log('Nova carona cadastrada no DB:', result.rows[0]);
        res.status(201).json({ message: 'Carona cadastrada com sucesso!', ride: result.rows[0] });
    } catch (error) {
        console.error('Erro ao cadastrar carona:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// GET /api/rides
app.get('/api/rides', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM rides ORDER BY ride_date DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar caronas:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});