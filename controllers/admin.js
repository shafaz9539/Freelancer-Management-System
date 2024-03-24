const db = require('../dbservice'); // Database service module
const bcrypt = require('bcryptjs'); // Module for password hashing
const jwt = require('jsonwebtoken'); // Module for JWT token
const { promisify } = require('util'); // Module for promisify
const dotenv = require('dotenv');
dotenv.config();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        db.query('SELECT aid, password FROM admin WHERE email = ?', [email], async (error, result) => {
            if (error) {
                console.log(error);
            }

            if (result.length > 0) {
                const hashedPassword = result[0].password;

                bcrypt.compare(password, hashedPassword, async (err, isMatch) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    if (isMatch) {
                        const token = jwt.sign({ id: result[0].aid }, process.env.JWT_KEY, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        });

                        const cookieOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        };

                        res.cookie('ajwt', token, cookieOptions);
                        res.status(200).redirect('/admin');
                    } else {
                        res.render('adminLogin.hbs', {
                            message: 'Incorrect password'
                        });
                    }
                });
            } else {
                res.render('adminLogin.hbs', {
                    message: 'User does not exist'
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

// Function for user logout
exports.logout = async (req, res) => {
    res.cookie('ajwt', '', { expires: new Date(0), httpOnly: true });
    res.redirect('/home');
};


exports.deleteFreelancer = async(req, res) => {
    const fid = req.params.id;

  db.query("DELETE FROM freelancers WHERE fid = ?", [fid], async(err, result) => {
    if(err){
      console.log(err)
    }
    else{
      res.redirect('/admin/freelancers');
    }
  });
}

exports.deleteClients = async(req, res) => {
    const cid = req.params.id;

  db.query("DELETE FROM clients WHERE cid = ?", [cid], async(err, result) => {
    if(err){
      console.log(err)
    }
    else{
      res.redirect('/admin/clients');
    }
  });
}

exports.deleteAdmin = async(req, res) => {
    const aid = req.params.id;

  db.query("DELETE FROM admin WHERE aid = ?", [aid], async(err, result) => {
    if(err){
      console.log(err)
    }
    else{
      res.redirect('/admin/admins');
    }
  });
}

exports.deleteCategory = async(req, res) => {
    const cid = req.params.id;

  db.query("DELETE FROM category WHERE cid = ?", [cid], async(err, result) => {
    if(err){
      console.log(err)
    }
    else{
      res.redirect('/admin/category');
    }
  });
}

exports.deleteFeedback = async(req, res) => {
    const fid = req.params.id;

  db.query("DELETE FROM feedback WHERE feid = ?", [fid], async(err, result) => {
    if(err){
      console.log(err)
    }
    else{
      res.redirect('/admin/feedback');
    }
  });
}

exports.insertCategory = async(req, res) => {
  const category = req.body.category;
  db.query('INSERT INTO category SET ?', {type: category}, async(err,result) =>{
    if(err){
      console.log(err);
    }
    else{
      res.redirect('/admin/category');
    }
  });
}

exports.updateCategory = async(req, res) => {
  const cid = req.params.id;
  const type = req.body.type;
  db.query('UPDATE category SET type=? WHERE cid=?', [type, cid], async(err, result)=> {
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.redirect('/admin/category');
    }
  });
}

exports.insertAdmin = async(req, res) => {
  console.log(req.body);
  const {name, email, password} = req.body
  db.query('SELECT email FROM admin WHERE email=?', [email], async(err, result) => {
    if(err){
      console.log(err);
    }
    if(result.length <= 0){
      let hashedPassoword = await bcrypt.hash(password, 8);
      console.log(hashedPassoword);

      db.query('INSERT INTO admin SET ?', {name, email, password: hashedPassoword}, async(err, results) => {
        if(err){
          console.log(err);
        }
        else{
          console.log(results);
          res.redirect('/admin/admins');
        }
      })
    }
    else{
      console.log('Email already exist');
      res.redirect('/admin/admins');
    }
  });
}

exports.updateAdmin = async(req, res) => {
  const aid = req.params.id;
  const {name, email} = req.body;
  db.query('UPDATE admin SET name=?, email=? WHERE aid=?', [name, email, aid], async(err, result)=> {
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.redirect('/admin/admins')
    }
  });
}
