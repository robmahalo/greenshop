const express = require('express')
const app = express()
require('dotenv').config()

// Import Routes
const userRoutes = require('./routes/user')

// Routes Middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// Import Mongoose
const mongoose = require('mongoose');

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
