require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');


const {mongoose} = require('./db/mongoose');

const app = express();

const PORT = process.env.PORT;
const corsOptions = {
	origin: ['http://localhost:3000']
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
require('./routes/index')(app);

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
	next();
})

app.listen(PORT, () => {
	console.log('Started on port', PORT);
});


module.exports = {app};
