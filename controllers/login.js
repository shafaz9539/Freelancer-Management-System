const db = require('../dbservice'); // Database service module
const bcrypt = require('bcryptjs'); // Module for password hashing
const jwt = require('jsonwebtoken'); // Module for JWT token
const { promisify } = require('util'); // Module for promisify
const dotenv = require('dotenv');

dotenv.config();

// Function for freelancer login
exports.flogin = async (req, res) => {
    try {
        const { lemail, lpassword } = req.body;

        db.query('SELECT fid, name, password FROM freelancers WHERE email = ?', [lemail], async (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send("Database error");
            }

            if (result.length === 0) {
                return res.render('flogin.hbs', { message: 'User does not exist' });
            }

            const { fid, password: hashedPassword } = result[0];

            const isMatch = await bcrypt.compare(lpassword, hashedPassword);
            if (!isMatch) {
                return res.render('flogin.hbs', { message: 'Incorrect password' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: fid }, process.env.JWT_KEY, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            const cookieOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            res.cookie('fjwt', token, cookieOptions);
            res.status(200).redirect('/home');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Function for client login
exports.clogin = async (req, res) => {
    try {
        const { lemail, lpassword } = req.body;

        db.query('SELECT cid, name, password FROM clients WHERE email = ?', [lemail], async (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send("Database error");
            }

            if (result.length === 0) {
                return res.render('clogin.hbs', { message: 'User does not exist' });
            }

            const { cid, password: hashedPassword } = result[0];

            const isMatch = await bcrypt.compare(lpassword, hashedPassword);
            if (!isMatch) {
                return res.render('clogin.hbs', { message: 'Incorrect password' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: cid }, process.env.JWT_KEY, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            const cookieOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            res.cookie('cjwt', token, cookieOptions);
            res.status(200).redirect('/home');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Middleware for checking if user is logged in
exports.isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.fjwt || req.cookies.cjwt; // Check both freelancer and client tokens
        if (!token) {
            return next(); // No token, proceed as unauthenticated user
        }

        // Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);

        // Determine user type (freelancer or client)
        const userTable = req.cookies.fjwt ? 'freelancers' : 'clients';
        const userIdColumn = req.cookies.fjwt ? 'fid' : 'cid';

        db.query(`SELECT * FROM ${userTable} WHERE ${userIdColumn} = ?`, [decoded.id], (error, result) => {
            if (error || result.length === 0) {
                return next();
            }

            req.user = result[0];
            return next();
        });
    } catch (error) {
        console.error(error);

        // Handle token expiration separately
        if (error.name === 'TokenExpiredError') {
            res.clearCookie('fjwt');
            res.clearCookie('cjwt');
            return res.redirect('/login'); // Redirect to login when token is expired
        }

        return next();
    }
};

// Function for user logout
exports.logout = (req, res) => {
    res.clearCookie('fjwt');
    res.clearCookie('cjwt');
    res.redirect('/');
};
