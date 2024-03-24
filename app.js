// Import required modules
const Joi = require('joi'); // Module for data validation
const path = require('path'); // Module for working with file and directory paths
const express = require('express'); // Framework for building web applications
const dotenv = require('dotenv'); // Module for loading environment variables from a .env file
const dbservice = require('./dbservice'); // Custom module for database service
const app = express(); // Create an Express application instance
const hbs = require('hbs');
const cookieParser = require('cookie-parser');

app.use(cookieParser());





// Load environment variables from .env file into process.env
dotenv.config();

hbs.registerPartials(path.join(__dirname, 'views/partials'), (err) => {})

// Set the path to the public directory
const publicDirectory = path.join(__dirname, './public');
// Serve static files from the public directory
app.use(express.static(publicDirectory));



// Set the view engine to handlebars (hbs) for rendering dynamic content
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Parse URL-encoded bodies (extended false: use the querystring library)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies
app.use(express.json());


// Route middleware to handle requests for pages
app.use('/', require('./routes/pages'));
// Route middleware to handle authentication-related requests
app.use('/auth', require('./routes/auth'));

module.exports = app;


// Start the Express.js application
app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}...`));
