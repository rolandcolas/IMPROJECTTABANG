require('dotenv').config();

const express = require("express");
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to PostgreSQL');
    release();
});

// Signup endpoint
app.post('/api/signup', (req, res) => {
    const sql = "INSERT INTO students (ID, email, password, Last_name, First_name, Year_Level) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [
        req.body.ID,
        req.body.email,
        req.body.password,
        req.body.lastName,
        req.body.firstName,
        req.body.yearLevel
    ];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error");
        }
        return res.status(201).json(result.rows);
    });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const sql = "SELECT * FROM students WHERE email = $1 AND password = $2";
    const values = [req.body.email, req.body.password];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error during login:', err);
            return res.json("Error");
        }
        if (result.rows.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    });
});

// Home route
app.get('/', (req, res) => res.send("API is working"));

// 404 route
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start server
app.listen(8081, () => {
    console.log("listening on port 8081");
});

app.get('/api/signup', (req, res) => {
    // Logic to retrieve data
    res.json({ message: 'GET request successful' });
});

module.exports = app;
