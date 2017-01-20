require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');


const {mongoose} = require('./db/mongoose');

const app = express();

const PORT = process.env.PORT;
const corsOptions = {
	origin: ['http://localhost:3000'],
	exposedHeaders: 'x-auth'
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
require('./routes/index')(app);


app.listen(PORT, () => {
	console.log('Started on port', PORT);
});


module.exports = {app};
