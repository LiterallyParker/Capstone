require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const client = require('./db/index');
client.connect();

server.use(cors());
server.use(express.json());

const apiRoutes = require("./api");
const { addUserToReq } = require("./auth/auth");
server.use(addUserToReq)
server.use('/api', apiRoutes);

server.get('*', (req, res, next) => {
  res.status(404).send({error: '404 - Not Found', message: 'No route found for the requested URL'});
});
const PORT = process.env.PORT || 3000;
server.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if(res.statusCode < 400) res.status(500);
  res.send({error: error.error, name: error.name, message: error.message, table: error.table});
});
server.listen(PORT, () => console.log(`Listening on Port ${PORT}`));