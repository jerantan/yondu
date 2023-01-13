const express = require('express');
const app = express();

const cors = require('cors');
const corsOpts = {
  origin: process.env.ORIGIN
};

const v1 = require('./v1/routes');
const v1Users = require('./v1/routes/users');

app.use(cors(corsOpts));
app.use(express.json());
app.use('/v1', v1);
app.use('/v1/users', v1Users);

module.exports = app;