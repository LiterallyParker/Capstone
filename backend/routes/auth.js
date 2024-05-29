const express = require('express');
const router = express.Router();
const auth = require('../auth/auth.js');

const dbUsers = require('../db/users');

router.post('/register', async (req, res, next) => {

  const userObject = {

    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password

  };

  try {
    const createdUser = await dbUsers.createUser(userObject);

    const token = await auth.createToken(createdUser);

    res.json({
      student: {
        id: createdUser.id,
        first_name: createdUser.first_name,
        last_name: createdUser.last_name,
        email: createdUser.email
      },
      token: token

    });

  } catch (error) {

    console.log(error)
    next(error)

  }

});

module.exports = router