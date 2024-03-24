// Import required modules
const db = require('../dbservice'); // Database service module
const bcrypt = require('bcryptjs'); // Module for password hashing

module.exports.freelancers = async (req, res) => {
  db.query('SELECT f.name, f.email, g.title, g.price, g.description from gigs g, freelancers f WHERE f.fid = g.fid', async (error,result) => {
    if (error) {
      console.log(error);
    }
    res.render('freelancers.hbs', {
      gigs: result,
    });
  });
};

module.exports.find = async (req, res) => {
  const searchTerm = req.body.search
  console.log(searchTerm)

  db.query('SELECT cid FROM category WHERE type LIKE ?', ['%' + searchTerm + '%'], async (error, results) =>{
    if(error){
      console.log(error);
    }
    else{
      const id = results[0].cid;
      db.query('SELECT f.name, f.email, g.title, g.price, g.description from gigs g, freelancers f WHERE f.fid = g.fid and g.cid = ?', [id], async(error, result) => {
        if(error){
          console.log(error);
        }
        else{
          console.log(result)
          res.render('freelancers.hbs', {
            gigs: result
          });
        }
      });
    }
  });
};