const express = require('express');
const router = express.Router();

const dbPurchases = require('../db/purchases');
const dbUsers = require('../db/users');
const { requireUser } = require('../util');

router.post("/", requireUser, async (req, res, next) => {
  const user_id = req.user.id;
  let { items } = req.body;

  if (!items || !items.length) {
    res.status(500).send({ error: true, message: "Nothing to buy!" });
    return;

  };

  try {
    const user = await dbUsers.getUserById(user_id);
    const purchase = await dbPurchases.addPurchase(user_id, items);

    res.status(200).send({ error: false, user, purchase });

  } catch (error) {
    next(error);

  };

});

router.get("/", requireUser, async (req, res, next) => {
  const user_id = req.user.id;

  try {
    const user = await dbUsers.getUserById(user_id);
    const purchases = await dbPurchases.getPurchasesByUserId(user_id);

    res.status(200).send({ error: false, user, purchases });

  } catch (error) {
    console.error(error);

  };
});

module.exports = router;