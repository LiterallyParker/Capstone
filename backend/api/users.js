const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const auth = require('../auth/auth');
const dbUsers = require('../db/users');
const { requireUser } = require('../util/users')

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  // Error handle for missing email/password
  if (!email || !password) {
    res.status(401).send({
      error: true,
      message: "Supply both an email and password."
    });
  };

  try {
    // Find user from Database
    const user = await dbUsers.getUser({ email, password });

    // Ensure user exists
    if (!user) {
      res.send({
        error: true,
        message:"Email or password is incorrect."
      });
    };

    // Create Token
    const token = await auth.createToken(user);
  
    res.send({ error:false, user, token });
    
  } catch (error) {
    console.error(error);
  };

});

router.post('/register', async (req, res, next) => {
  let { firstname, lastname, email, password } = req.body
  if (!email || !password) {
    res.status(500).send({
      error: true,
      message: "Supply email and password."
    });
  };
  if (!firstname) {
    firstname = "Guest"
  }
  if (!lastname) {
    lastname = "User"
  }
  try {
    // Check if user already Exists

    const existingUser = await dbUsers.getUserByEmail(req.body.email.toLowerCase());
    if (existingUser) {
      res.status(400).send({ error: true, message: "User with the supplied email already exists." });
      return;
    };

    // Create new user from request

    const userObject = {
      firstname: firstname,
      lastname: lastname,
      email: email.toLowerCase(),
      password: password
    };

    // Add user to database

    const createdUser = await dbUsers.createUser(userObject);
    const token = await auth.createToken(createdUser);
    res.send({
      error: false,
      user: {
        id: createdUser.id,
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
        email: createdUser.email
      },
      token
    });

  } catch (error) {
    next(error);

  };

});

router.get("/account", requireUser, (req, res, next) => {
  try {
    res.send(req.user);

  } catch (error) {
    next(error);

  };
});

module.exports = router;