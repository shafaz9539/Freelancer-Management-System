// Import required modules
const mysql = require('mysql'); 
const dotenv = require('dotenv');

// Load environment variables from .env file into process.env
dotenv.config();

// Create a connection to the MySQL database using environment variables
const connection = mysql.createConnection({
  host: process.env.HOST, // MySQL host
  user: process.env.USER, // MySQL user
  password: "", // MySQL password (empty for now, will be replaced with actual password)
  database: process.env.DATABASE, // MySQL database name
  port: process.env.DB_PORT // MySQL port
});

// Attempt to connect to the database
connection.connect((err) => {
  if (err) {
    // If an error occurs during connection, log the error message
    console.log(err.message);
  }
  // Log the current state of the database connection
  console.log('db ' + connection.state); 
});


module.exports = connection;
