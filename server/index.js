const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
var path = require('path');
require('dotenv').config();

const app = express()
const corsOptions = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
};

// Import user routes
var users = require('./routes/users');

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist/'))); // Serve static files from the client build directory
app.use('/public', express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use('/uploads', express.static('uploads')); // Serve uploaded files from the 'uploads' directory

// Connect to MongoDB using Mongoose
mongoose.connect(`mongodb://${process.env.MONGO_ENDPOINT}/${process.env.DATABASE_NAME}`)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define API routes
app.use('/api/user', upload.single('image'), users);

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000!");
});