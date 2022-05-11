const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

const apiRoutes = require('./modules/routes/routes');

app.use(cors());

const url = 'mongodb+srv://ilya:ilya@cluster0.frdmt.mongodb.net/todos';
mongoose.connect(url, {
    useUnifiedTopology: true, 
    useNewUrlParser: true
});

app.use(bodyParser.json());
app.use("/", apiRoutes);

app.listen(8080, () => {
    console.log('App listening on port 8080');
});