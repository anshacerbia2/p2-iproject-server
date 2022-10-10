if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const routes = require('./routes');

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Running on:${port}`);
});
// module.exports = app;
