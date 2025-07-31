// Import required packages
const express = require('express');
const { Client } = require('pg'); // Import PostgreSQL client
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

// Initialize the express app
const app = express();

// Middleware
app.use(express.json());

// Set up PostgreSQL client
const client = new Client({
  host: process.env.PG_HOST || 'localhost',  // Default host is localhost
  port: process.env.PG_PORT || 5432,        // Default PostgreSQL port
  user: process.env.PG_USER || 'postgres',  // Default PostgreSQL user
  password: process.env.PG_PASSWORD || 'Mahima_@08', // Use your password
  database: process.env.PG_DATABASE || 'swachnetra', // Your database name
});

// Connect to PostgreSQL
client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch(err => {
    console.error("Connection error", err.stack);
  });

// Sample route to test database query
app.get('/test', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()'); // Sample query to get the current time from PostgreSQL
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Database query error');
  }
});

// Default route to check server status
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
