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
    next(error);
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
  if (!firstname && !lastname) {
    firstname = "Guest";
    lastname = "User";
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

router.patch("/account", requireUser, async (req, res, next) => {
  try {

    // get changes
    let { firstname, lastname, email, password, newPassword } = req.body;

    // if a new password request, ensure old password is correct
    if (newPassword) {
      if (!password) {
        res.send({error:true, message:"Supply old password."});
        return;
      };
      const user = await dbUsers.getUserByEmail(req.user.email);
      const passwordsMatch = await bcrypt.compare(password, user.hash);
      if (!passwordsMatch) {
        res.send({error:true, message:"Incorrect Password."})
        return;
      };
      await dbUsers.updatePassword(req.user.id, newPassword)
    };

    // set default if no change was made
    if (!firstname) {
      firstname = req.user.firstname
    }
    if (!lastname) {
      lastname = req.user.lastname
    }
    if (!email) {
      email = req.user.email
    }

    const userObject = {firstname, lastname, email}
    const patchedUser = await dbUsers.updateUserInfo(req.user.id, userObject);
    res.send(patchedUser);
    next();
    
  } catch (error) {
    next(error);

  };
});

module.exports = router;