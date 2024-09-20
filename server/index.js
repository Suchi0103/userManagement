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

var users = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'))

mongoose.connect(`mongodb://${process.env.MONGO_ENDPOINT}/${process.env.DATABASE_NAME}`)

app.use('/api/user', upload.single('image'), users);

app.listen(3000, () => {
    console.log("Server is running!")
})