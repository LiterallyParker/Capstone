const express = require('express');
const api = express.Router();

const userRoutes = require('./users');
const instrumentRoutes = require('./instruments')

api.use("/users", userRoutes);
api.use("/instruments", instrumentRoutes);

module.exports = api;