require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
require('./routes/index')(app);

app.listen(PORT, () => {
	console.log('Started on port', PORT);
});


module.exports = {app};
