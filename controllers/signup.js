// Import required modules
const db = require('../dbservice'); // Database service module
const bcrypt = require('bcryptjs'); // Module for password hashing



exports.csignup = (req, res) => {
  console.log(req.body);

  const { cname, cemail, ccompany_name, cpassword } = req.body;

  db.query('SELECT email, name FROM clients WHERE email = ?', [cemail], async (error, result) => {
    if (error) {
      console.log(error);
    }

    if (result.length > 0) {
      return res.render('csignup.hbs', {
        message: 'Given email is already in use.'
      });
    }
    
    let chashedPassoword = await bcrypt.hash(cpassword, 8);
    console.log(chashedPassoword);

    db.query('INSERT INTO clients SET ?', { name: cname, email: cemail, company_name: ccompany_name, password: chashedPassoword }, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        console.log("user created successfully");
        return res.render('clogin.hbs', {
          name: cname,
        });
      }
    });
  });
}

exports.fsignup = (req, res) => {
  console.log(req.body);

  const { fname, femail, fpassword } = req.body;

  db.query('SELECT email FROM freelancers WHERE email = ?', [femail], async (error, result) => {
    if (error) {
      console.log(error);
    }

    if (result.length > 0) {
      return res.render('fsignup.hbs', {
        message: 'Given email is already in use.'
      });
    }

    let fhashedPassoword = await bcrypt.hash(fpassword, 8);
    console.log(fhashedPassoword);

    db.query('INSERT INTO freelancers SET ?', { name: fname, email: femail, password: fhashedPassoword }, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        console.log("user created successfully");
        return res.render('flogin.hbs', {
          name: fname,
        });
      }
    });
  });
}




