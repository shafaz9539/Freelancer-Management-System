const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const db = require('../dbservice'); // Database service module
const jwt = require('jsonwebtoken'); // Module for JWT token
const { promisify } = require('util'); // Module for promisify
const dotenv = require('dotenv');
dotenv.config();




router.get('/', (req, res) => {
  res.render('index.hbs');
});
router.get('/home', loginController.isLoggedIn, (req, res) => {
  if (req.user) {
    if (!req.cookies['fjwt']) {
      res.render('index.hbs', {
        name: req.user.name,
        hire: "hire",
        error: "login as a freelancer to create a gig"
      });
    }
    else {
      res.render('index.hbs', {
        name: req.user.name,
      });
    }
  }
  else {
    res.redirect('/');
  }

});


router.get('/client', (req, res) => {
  res.render("client.hbs");
});

router.get('/client/fsignup', (req, res) => {
  res.render("fsignup.hbs");
});

router.get('/client/csignup', (req, res) => {
  res.render("csignup.hbs");
});

router.get('/flogin', (req, res) => {
  res.render("flogin.hbs");
});
router.get('/clogin', (req, res) => {
  res.render("clogin.hbs");
});

router.get('/Talents', (req, res) => {
  res.render("freelancers.hbs");
});
router.get('/alogin', (req, res) => {
  res.render("adminLogin.hbs");
});
router.get('/gig', loginController.isLoggedIn, (req, res) => {
  db.query('SELECT * FROM category', async (error, result) => {
    if (error) {
      console.log(error);
    }
    else {
      res.render('gig.hbs', {
        category: result
      });
      console.log(result);
    }
  });
});

router.get('/freelancer/hire', loginController.isLoggedIn, (req, res) => {
  if (req.user) {

    db.query('SELECT f.name, f.email, g.title, g.price, g.description from gigs g, freelancers f WHERE f.fid = g.fid', async (error, result) => {
      if (error) {
        console.log(error);
      }
      if (req.cookies['fjwt']) {
        res.render('freelancers.hbs', {
          gigs: result,
          error: "Login as Client to Hire Freelancer"
        });
      }
      else{
        res.render('freelancers.hbs', {
          gigs: result,
          success: "The proposal has been sent. Please wait for a reply."
        });
      }
    });
  }
  else {
    res.redirect('/');
  }
});

router.get('/admin', async (req, res) => {
  if (req.cookies.ajwt) {
    const decoded = await promisify(jwt.verify)(req.cookies.ajwt, process.env.JWT_KEY);
    db.query("SELECT name FROM admin where aid = ?", [decoded.id], async (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        const adminName = result[0].name;
        db.query("SELECT 'admin' AS table_name, COUNT(*) AS count FROM admin UNION ALL  SELECT 'category', COUNT(*) FROM category  UNION ALL SELECT 'clients', COUNT(*) FROM clients UNION ALL  SELECT 'feedback', COUNT(*) FROM feedback UNION ALL SELECT 'freelancers', COUNT(*) FROM freelancers UNION ALL SELECT 'gigs', COUNT(*) FROM gigs; ", async (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(results);
          res.render('admin.hbs', {
            name: adminName,
            acount: results[0].count,
            ctcount: results[1].count,
            cl: results[2].count,
            feedcount: results[3].count,
            fcount: results[4].count,
            gcount: results[5].count
          });
        });

      }
    });

  }
});
router.get('/admin/gigs', async (req, res) => {
  if (req.cookies.ajwt) {
    const decoded = await promisify(jwt.verify)(req.cookies.ajwt, process.env.JWT_KEY);
    db.query("SELECT name FROM admin where aid = ?", [decoded.id], async (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        const adminName = result[0].name;
        db.query('SELECT freelancers.name AS freelancer_name, gigs.gid, gigs.title, gigs.description, gigs.price, category.type AS category FROM gigs JOIN freelancers ON gigs.fid = freelancers.fid JOIN category ON gigs.cid = category.cid ORDER BY gigs.gid ASC', async (error, result) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log(result);
            res.render('adminGig.hbs', {
              name: adminName,
              gigs: result
            });
          }
        });
      }
    });

  }

});

router.get('/admin/freelancers', async (req, res) => {
  if (req.cookies.ajwt) {
    const decoded = await promisify(jwt.verify)(req.cookies.ajwt, process.env.JWT_KEY);
    db.query("SELECT name FROM admin where aid = ?", [decoded.id], async (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        const adminName = result[0].name;
        db.query('SELECT f.fid AS freelancer_id, f.name AS freelancer_name, COALESCE(COUNT(g.gid), 0) AS num_gigs_posted FROM freelancers f LEFT JOIN gigs g ON f.fid = g.fid GROUP BY f.fid, f.name ORDER BY num_gigs_posted DESC', async (error, result) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log(result);
            res.render('adminFreelancer.hbs', {
              name: adminName,
              freelancers: result
            });
          }
        });
      }
    });

  }
});

router.get('/admin/clients', async (req, res) => {
  if (req.cookies.ajwt) {
    const decoded = await promisify(jwt.verify)(req.cookies.ajwt, process.env.JWT_KEY);
    db.query("SELECT name FROM admin where aid = ?", [decoded.id], async (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        const adminName = result[0].name;
        db.query('SELECT * FROM clients ORDER BY cid ASC', async (error, result) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log(result);
            res.render('adminClient.hbs', {
              name: adminName,
              clients: result
            });
          }
        });
      }
    });

  }
});

router.get('/admin/admins', async (req, res) => {
  if (req.cookies.ajwt) {
    const decoded = await promisify(jwt.verify)(req.cookies.ajwt, process.env.JWT_KEY);
    db.query("SELECT name FROM admin where aid = ?", [decoded.id], async (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        const adminName = result[0].name;
        db.query('SELECT * FROM admin ORDER BY aid ASC', async (error, result) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log(result);
            res.render('adminAdmin.hbs', {
              name: adminName,
              admins: result
            });
          }
        });
      }
    });

  }
});

router.get('/admin/category', async (req, res) => {
  if (req.cookies.ajwt) {
    const decoded = await promisify(jwt.verify)(req.cookies.ajwt, process.env.JWT_KEY);
    db.query("SELECT name FROM admin where aid = ?", [decoded.id], async (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        const adminName = result[0].name;
        db.query('SELECT * FROM category ORDER BY cid ASC', async (error, result) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log(result);
            res.render('adminCategory.hbs', {
              name: adminName,
              category: result
            });
          }
        });
      }
    });

  }
});

router.get('/admin/feedback', async (req, res) => {
  if (req.cookies.ajwt) {
    const decoded = await promisify(jwt.verify)(req.cookies.ajwt, process.env.JWT_KEY);
    db.query("SELECT name FROM admin where aid = ?", [decoded.id], async (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        const adminName = result[0].name;
        db.query('SELECT * FROM feedback ORDER BY feid ASC', async (error, result) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log(result);
            res.render('adminFeedback.hbs', {
              name: adminName,
              feedback: result
            });
          }
        });
      }
    });

  }
});

module.exports = router;

