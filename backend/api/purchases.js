const express = require('express');
const router = express.Router();

const auth = require('../auth/auth');
const dbPurchases = require('../db/purchases');
const { requireUser } = require('../util/users')

router.post("/", requireUser, async (req, res, next) => {
  const id = req.user.id;
  const { total, items } = req.body;
  if (!total || !items.length) {
    res.status(500).send({error:true,message:"Nothing to buy!"});
    return;
  }

  try {
    const purchase = await dbPurchases.addPurchase({ id, total, items: {items:items} })
    res.status(200).send({error:false,purchase});

  } catch (error) {
    next(error)
  }
})

module.exports = router