const express = require('express');
const router = express.Router();

const auth = require('../auth/auth');
const dbUsers = require('../db/users');

// router.post('/login', async ());

router.post('/register', async (req, res, next) => {
  
  // Check if user already Exists
  const existingUser = await dbUsers.getUserByEmail(req.body.email);

  if (existingUser.length) {
    res.send({ error: true, message: "User with the supplied email already exists."});
    return;
  };

  // Create new user from request
  const userObject = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  
  // Add user to database
  try {
    const createdUser = await dbUsers.createUser(userObject);
    const token = await auth.createToken(createdUser);
    res.send({
      user: {
        id: createdUser.id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email
      },
      token: token
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
  
})

module.exports = router;