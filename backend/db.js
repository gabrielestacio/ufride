const { Pool } = require('pg');

// Crie um "pool" de conexões para otimizar os recursos.
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ufride',
    password: '',
    port: 5432,
});

// Exportamos uma função 'query' para usar em todo o nosso app.
module.exports = {
    query: (text, params) => pool.query(text, params),
};