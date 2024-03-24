const db = require('../dbservice'); // Database service module
const bcrypt = require('bcryptjs'); // Module for password hashing


exports.feedback = async (req, res) => {
  console.log(req.body);
  const {name, email, feedback} = req.body;
  db.query('INSERT INTO feedback SET ?',  { name: name, email: email, content: feedback}, async(error, result) => {
    if(error){
      console.log(error)
    }
    else{
      res.redirect('/home');
    }
  });
  
};