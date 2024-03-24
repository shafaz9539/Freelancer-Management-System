const db = require('../dbservice'); // Database service module
const jwt = require('jsonwebtoken'); // Module for JWT token
const { promisify } = require('util'); // Module for promisify
const dotenv = require('dotenv');
const { ifError } = require('assert');
dotenv.config();
  

exports.createGig = async (req, res) => {
  console.log(req.body);
  const {title, description, catogery, price} = req.body
  try {
    if (req.cookies.fjwt) {
        const decoded = await promisify(jwt.verify)(req.cookies.fjwt, process.env.JWT_KEY);
        console.log(decoded.id);
        db.query('INSERT INTO gigs SET ?', {fid: decoded.id, title: title, description: description, cid: catogery, price: price }, (error, result) => {
          if(error){
            console.log(error);
          }
          else{
            console.log(result);
            res.redirect('/home');
          }        
        });
    }
} catch (error) {
    console.log(error);
}
};

exports.deleteGig = async(req, res) => {
  const gid = req.params.id;

  db.query("DELETE FROM gigs WHERE gid = ?", [gid], async(err, result) => {
    if(err){
      console.log(err)
    }
    else{
      res.redirect('/admin/gigs');
    }
  });
}