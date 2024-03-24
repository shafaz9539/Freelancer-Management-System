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

        db.query('SELECT fid, password FROM freelancers WHERE email = ?', [lemail], async (error, result) => {
            if (error) {
                console.log(error);
            }

            else if (result.length > 0) {
                const userName = result[0].name;
                const hashedPassword = result[0].password;

                bcrypt.compare(lpassword, hashedPassword, async (err, isMatch) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    if (isMatch) {
                        const token = jwt.sign({ id: result[0].fid }, process.env.JWT_KEY, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        });

                        const cookieOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        };

                        res.cookie('fjwt', token, cookieOptions);
                        res.status(200).redirect('/home');
                    } else {
                        res.render('flogin.hbs', {
                            message: 'Incorrect password'
                        });
                    }
                });
            } else {
                res.render('flogin.hbs', {
                    message: 'User does not exist'
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

// Function for client login
exports.clogin = async (req, res) => {
    try {
        const { lemail, lpassword } = req.body;

        db.query('SELECT cid, password FROM clients WHERE email = ?', [lemail], async (error, result) => {
            if (error) {
                console.log(error);
            }

            if (result.length > 0) {
                const userName = result[0].name;
                const hashedPassword = result[0].password;

                bcrypt.compare(lpassword, hashedPassword, async (err, isMatch) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    if (isMatch) {
                        const token = jwt.sign({ id: result[0].cid }, process.env.JWT_KEY, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        });

                        const cookieOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        };

                        res.cookie('cjwt', token, cookieOptions);
                        res.status(200).redirect('/home');
                    } else {
                        res.render('clogin.hbs', {
                            message: 'Incorrect password'
                        });
                    }
                });
            } else {
                res.render('clogin.hbs', {
                    message: 'User does not exist'
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

// Middleware for checking if user is logged in
exports.isLoggedIn = async (req, res, next) => {
    try {
        if (req.cookies.fjwt) {
            const decoded = await promisify(jwt.verify)(req.cookies.fjwt, process.env.JWT_KEY);

            db.query('SELECT * FROM freelancers WHERE fid = ?', [decoded.id], (error, result) => {
                if (!result) {
                    return next();
                }

                req.user = result[0];
                return next();
            });
        }
        else if (req.cookies.cjwt) {
                const decoded = await promisify(jwt.verify)(req.cookies.cjwt, process.env.JWT_KEY);

                db.query('SELECT * FROM clients WHERE cid = ?', [decoded.id], (error, result) => {
                    if (!result) {
                        return next();
                    }

                    req.user = result[0];
                    return next();
                });

            } else {
                next();
            }
        } catch (error) {
            console.log(error);
            return next();
        }
    };

    // Function for user logout
    exports.logout = async (req, res) => {
        res.cookie('fjwt', '', { expires: new Date(0), httpOnly: true });
        res.cookie('cjwt', '', { expires: new Date(0), httpOnly: true });
        res.redirect('/');
    };

