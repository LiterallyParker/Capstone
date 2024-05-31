const express = require('express');
const api = express.Router();

const authRoutes = require('../routes/auth');
const instrumentRoutes = require('../routes/instruments')

api.use("/auth", authRoutes);
api.use("/instruments", instrumentRoutes);

module.exports = api;

/*
  /api
    /auth
      /login
      /register
    /instruments
    /catagories
    /



*/