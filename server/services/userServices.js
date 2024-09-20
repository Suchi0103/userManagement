const UserModel = require('../models/Users'); // Import the User model for database operations
const util = require('../utils/utilts'); // Import utility functions for input validation

// Function to get all users from the database
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.find({})
            .then(users => {
                resolve(users);
                return json(users);
            })
            .catch(err => {
                reject(err);
                return;
            });
    });
}
exports.getAllUsers = getAllUsers;

// Function to get a specific user by ID
const getUser = (id) => {
    return new Promise((resolve, reject) => {
        UserModel.findById({ _id: id })
            .then(user => {
                resolve(user);
                return json(user);
            })
            .catch(err => {
                reject(err);
                return;
            });
    });
}
exports.getUser = getUser;

// Function to add a new user to the database
const addNewUser = (req) => {
    return new Promise((resolve, reject) => {
        const imageUrl = req.file && req.file.path;
        validateInputs(req, imageUrl)
            .then(() => {
                let payload = {
                    ...req.body,
                    imageUrl
                }
                UserModel.create(payload)
                    .then(users => {
                        resolve(users);
                        return json(users);
                    })
                    .catch(err => {
                        reject({msg: err});
                        return;
                    });
            })
            .catch(error => {
                reject(error);
                return;
            });
    });
}
exports.addNewUser = addNewUser;

// Function to update an existing user by ID
const updateUser = (id, req) => {
    return new Promise((resolve, reject) => {
        let imageUrl = "";
        if (req.file && req.file.path) {
            imageUrl = req.file.path;
        } else {
            imageUrl = req.body.imagePath;
        }
        validateInputs(req, imageUrl) // Validate the input fields
            .then(() => {
                UserModel.findByIdAndUpdate({ _id: id }, {
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    imageUrl: imageUrl
                })
                    .then(user => {
                        resolve(user);
                        return json(user);
                    })
                    .catch(err => {
                        reject(err);
                        return;
                    });
            })
            .catch(error => {
                reject(error);
                return;
            });
    });
}
exports.updateUser = updateUser;

// Function to delete a user by ID
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndDelete({ _id: id })
            .then(() => {
                resolve(true);
                return true;
            })
            .catch(err => {
                reject(err);
                return;
            });
    });
}
exports.deleteUser = deleteUser;

// Function to validate user input fields
const validateInputs = (req, imageUrl) => {
    return new Promise((resolve, reject) => {
        let checkempty = util.isEmpty([req.body.name, req.body.email, req.body.phoneNumber, imageUrl]);
        if (!checkempty) {
            reject({msg: 'Please Enter all the required Fields'});
            return;
        }
        let checkName = util.isValidName(req.body.name);
        if (!checkName) {
            reject({msg: 'Invalid Name'});
            return;
        }
        let checkmail = util.isValidEmail(req.body.email);
        if (!checkmail) {
            reject({msg: 'Invalid Email ID'});
            return;
        }
        let checkPhoneNumber = util.isVallidPhoneNumber(req.body.phoneNumber);
        if (!checkPhoneNumber) {
            reject({msg: 'Invalid Phone Number'});
            return;
        }
        resolve(true);
        return;
    });
}