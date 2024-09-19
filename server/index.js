const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
var path = require('path');

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

mongoose.connect("mongodb://127.0.0.1:27017/crud")

app.use('/api/user', upload.single('image'), users);

// app.get("/", (req, res) => {
//     UserModel.find({})
//         .then(users => res.json(users))
//         .catch(err => res.json(err))
// })

// app.get("/getUser/:id", (req, res) => {
//     const id = req.params.id;
//     UserModel.findById({_id:id})
//         .then(user => res.json(user))
//         .catch(err => res.json(err))
// })

// app.post("/addUser", upload.single('image'), (req, res) => {
//     console.log("req: ", req)
//     const imageUrl = req.file.path;
//     let payload = {
//         ...req.body,
//         imageUrl
//     }
//     UserModel.create(payload)
//         .then(users => res.json(users))
//         .catch(err => res.json(err))
// })

// app.put("/updateUser/:id", upload.single('image'), (req, res) => {
//     const id = req.params.id
//     UserModel.findByIdAndUpdate({_id: id}, {
//         name:req.body.name, 
//         email:req.body.email, 
//         phoneNumber: req.body.phoneNumber,
//         imageUrl: req.file.path
//     })
//         .then(user => res.json(user))
//         .catch(err => res.json(err))
// })

// app.delete('/deleteUser/:id', (req, res) => {
//     const id = req.params.id
//     UserModel.findByIdAndDelete({_id: id})
//         .then(res => res.json(res))
//         .catch(err => res.json(err))
// })


app.listen(3000, () => {
    console.log("Server is running!")
})