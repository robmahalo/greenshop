const express = require('express')
const app = express()
require('dotenv').config()


app.get("/", (req, res) => {
    res.send("hello from node!!");
});

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// Import Mongoos
const mongoose = require('mongoose');
// Load env variables
const dotenv = require('dotenv');
dotenv.config()

// Database Connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
)
.then(() => console.log('Database is Now Connected'))

mongoose.connection.on('Error', err => {
    console.log(`Database Connection Error: ${err.message}`)
})