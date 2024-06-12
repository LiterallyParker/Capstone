const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")

const auth = require('../auth/auth');
const dbUsers = require('../db/users');
const { checkForCorrectUser } = require("../auth/auth");

router.post('/login', async (req, res, next) => {

  try {

    const requestedUser = {
      email: req.body.email.toLowerCase(),
      password: req.body.password
    };

    if (!requestedUser.email || !requestedUser.password) {
      res.status(401).send({ error: true, message: "Supply valid info." });
      return;
    };

    const foundUser = await dbUsers.getUserByEmail(requestedUser.email);
    if (!foundUser.id) {
      res.status(401).send({error: true, message: "Incorrect email and/or password."});
      return;
    };

    const comparison = await bcrypt.compare(req.body.password, foundUser.hash);
    if (!comparison) {
      res.status(401).send({ error: true, message: "Incorrect email and/or password."});
      return;
    }

    const token = await auth.createToken(foundUser)
    res.status(200).json({
      user: {
        "id": foundUser.id,
        "firstName": foundUser.firstname,
        "lastName": foundUser.lastname,
        "email": foundUser.email
      },
      token: token
    });

  } catch (error) {
    console.log(error);
    next(error);
  }

});

router.post('/register', async (req, res, next) => {

  try {
    // Check if user already Exists

    const existingUser = await dbUsers.getUserByEmail(req.body.email.toLowerCase());
    if (existingUser.id) {
      res.status(400).send({ error: true, message: "User with the supplied email already exists." });
      return;
    };

    // Create new user from request

    const userObject = {
      firstName: req.body.firstName.toLowerCase(),
      lastName: req.body.lastName.toLowerCase(),
      email: req.body.email.toLowerCase(),
      password: req.body.password
    };

    // Add user to database

    const createdUser = await dbUsers.createUser(userObject);
    const token = await auth.createToken(createdUser);
    res.send({
      user: {
        id: createdUser.id,
        firstName: createdUser.firstname,
        lastName: createdUser.lastname,
        email: createdUser.email
      },
      token: token
    });

  } catch (error) {
    console.log(error);
    next(error);
  };

});

module.exports = router;