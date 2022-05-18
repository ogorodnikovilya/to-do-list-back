require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const apiRoutes = require('./src/modules/routes/tasks.routes');

app.use(cors({
  'Access-Control-Allow-Origin': '*'
}));

const init = async() => {
  try {
    mongoose
    .connect(process.env.URL, {
      useUnifiedTopology: true, 
      useNewUrlParser: true
    })
    .catch(error => console.error(error));
    app.use(express.json());
    app.use("/", apiRoutes);
    
    app.listen(8080, () => {
      console.log('App listening on port 8080');
    });
  } catch (error) {
    console.error(error);
  }
};

init();
