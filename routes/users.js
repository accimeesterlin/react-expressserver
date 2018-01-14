const express = require('express');
const connection = require("../db"); // connection
const bcrypt = require("bcrypt"); // encrypt password


// bcrypt

// Callback way
// bcrypt.genSalt()
// bcrypt.hash()

// Synchronise way
// bcrypt.genSaltSync()
// bcrypt.hashSync()




/* GET users listing. */
module.exports = (app) => {

  app.get('/', (req, res, next) => {
    res.json({ msg: 'respond with a resource' });
  });

  app.post("/signup", (req, res) => {
    // TODO
    console.log("Body: ", req.body);

    const username = req.body.username;
    const password = req.body.password;


    // Encrypting password
    const salts = bcrypt.genSaltSync(10); // salt
    const hash = bcrypt.hashSync(password, salts) // hash

    const user = {
      username, // patrick
      password: hash
    };

    // after we check user is not already into our database

    connection.query("SELECT * FROM users WHERE username = ?", [username], (err, data) => {
      if (err) {
        res.status(502).json({ error: "Connection error" });
      } else {
        if (data.length === 0) {
          // Create new user
          connection.query("INSERT INTO users SET ?", user, (err, data) => {
            if (err) {
              res.status(502).json({ error: "Not able to save the user" });
            } else {
              res.json({ msg: "User has successfully been saved!" });
            }
          });
        } else {
          res.status(409).json({ error: "Sorry, user already exists" });
        }
      }
    });


  });

  app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existed_user = {
      username,
      password
    };

    connection.query("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
      if (err) {
        res.status(502).json({error: "Connection errors"});
      } else {
        if (user.length > 0) {
          // There is a return user
          const compare_password = bcrypt.compareSync(password, user[0].password);
          if(compare_password === true){
            // Everything validates
            res.json({msg: "User is logged in"});
          } else{
            console.log("Invalid password");
            res.status(409).json({error: "Invalid credentials"});
          }

        } else {

          res.status(404).json({error: "You are not into our database, please sign up"});
        }
      }
    });
  });


};

