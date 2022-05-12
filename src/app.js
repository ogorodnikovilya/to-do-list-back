const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const apiRoutes = require('./modules/routes/routes');

app.use(cors({
  'Access-Control-Allow-Origin': '*'
}));

mongoose.connect(process.env.URL, {
  useUnifiedTopology: true, 
  useNewUrlParser: true
});

app.use(express.json());
app.use("/", apiRoutes);

app.listen(8080, () => {
  console.log('App listening on port 8080');
});