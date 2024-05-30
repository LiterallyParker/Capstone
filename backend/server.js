require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const client = require('./db/index')
client.connect()

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const apiRoutes = require("./api");
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  res.status(404).send({error: '404 - Not Found', message: 'No route found for the requested URL'});
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));