const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');

const { createUser, getUserByEmail } = require('../db/users');

// router.post('/login', async ());

router.post('/register', async (req, res, next) => {
  
  const user = await getUserByEmail(req.body.email)
  console.log(user)

  if (user.length) {
    res.status(401).send({error:true,message:"User Exists."})
    return
  }

  const userObject = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  }
  
  try {
    const createdUser = await createUser(userObject);
    const token = await auth.createToken(createdUser);
    res.send({
      user: {
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
  
})

module.exports = router