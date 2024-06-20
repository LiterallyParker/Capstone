const express = require('express');
const router = express.Router();

const dbInstruments = require("../db/instruments")

router.get('/', async (req, res, next) => {

  try {
    const instrumentRows = await dbInstruments.getInstruments();

    res.send({
      error: false,
      instruments: instrumentRows
    });

  } catch (error) {
    console.error(error);
    next(error);

  };

});

router.get('/:instrumentId', async (req, res, next) => {
  const id = req.params.instrumentId;

  try {
    const instrument = await dbInstruments.getInstrumentById(id);

    if (!instrument) {
      res.status(500).send({
        error: true,
        message: `Instrument with id ${req.params.instrumentId} not found.`
      });
      return;
    };

    res.send({
      error: false,
      instrument
    });

  } catch (error) {
    console.error(error);
    next(error);

  };
});

module.exports = router;