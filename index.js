// Import dependencies
const express = require('express')
require('express-async-errors')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT;

// Import routes
const shippingRateRoutes = require('./routes/shippingRateRoutes')

// To support encoded bodies / json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set static asset to public folder
app.use(express.static('public'));

// Routes
app.use('/shipping', shippingRateRoutes) 

// Listener
app.listen(port, () => {
    console.log(`Server is listening on port:${port}`);
});
