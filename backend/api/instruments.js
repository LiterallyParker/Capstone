const express = require('express');
const router = express.Router();

const dbInstruments = require("../db/instruments")

router.get('/', async (req, res, next) => {

  try {

    const instrumentRows = await dbInstruments.getInstrumentRows();

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
  try {

    const instrumentRow = await dbInstruments.getInstrumentById(req.params.instrumentId);

    if (!instrumentRow.length) {
      res.status(500).send({
        error:true,
        message:`Instrument with id ${req.params.instrumentId} not found.`
      });
      return;
    }

    res.send({
      error:false,
      instrument: {...instrumentRow[0]}
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;