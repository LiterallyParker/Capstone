const express = require('express');
const api = express.Router();

const authRoutes = require('./auth');

api.use("/auth", authRoutes);

module.exports = api