const express = require('express');
const api = express.Router();

const userRoutes = require('./users');
const instrumentRoutes = require('./instruments');
const purchasesRoutes = require('./purchases');

api.use("/users", userRoutes);
api.use("/instruments", instrumentRoutes);
api.use("/purchases", purchasesRoutes);

module.exports = api;