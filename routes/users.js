const express = require('express');
const connection = require("../db"); // connection
const passport = require("passport");

/* GET users listing. */
module.exports = (app) => {

  app.get('/', (req, res, next) => {
    res.json({ msg: 'respond with a resource' });
  });

  app.post('/signup', passport.authenticate('local'), function (req, res) {
    res.json({ msg: "User is now authenticated!" });
  });
};


  // app.post("/signup", (req, res) => {
  //   console.log("Body: ", req.body);
  //   const { username } = req.body;
  //   const { password } = req.body;

  //   const new_user = {
  //     username,
  //     password
  //   };

  //   console.log("User: ", new_user);

  //   res.json({ msg: "We receive the data" });
  // });