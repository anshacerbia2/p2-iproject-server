if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const MidtransController = require('./Controllers/MidtransController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post('/', MidtransController.bankTransfer)
app.use('/', routes);

module.exports = app;
