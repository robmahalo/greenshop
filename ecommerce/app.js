const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

require('dotenv').config()

// Import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

// App
const app = express();

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// Routes Middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// Database

// Load env variables
const dotenv = require('dotenv');
dotenv.config()

// Database Connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
)
.then(() => console.log('Database Connected Successfully'))

mongoose.connection.on('Error', err => {
    console.log(`Database Connection Error: ${err.message}`)
})
