const express = require("express");
const router = express.Router();
const userService = require('../services/userServices'); // Import user service for handling user-related operations

// Route to get all users
router.get("/", (req, res) => {
    try {
        userService.getAllUsers()
            .then((getAllUserResp) => {
                res.status(200).send(getAllUserResp);
            })
            .catch((err) => {
                console.log("in catch");
                res.status(400).send(err);
            });
    } catch (e) {
        console.log('catch in update user: ', e);
        res.status(500).send('Something went wrong');
    }
});

// Route to get a specific user by ID
router.get("/getUser/:id", (req, res) => {
    try {
        const id = req.params.id;
        userService.getUser(id)
            .then((getUserResp) => {
                res.status(200).send(getUserResp);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    } catch (e) {
        console.log('catch in update user: ', e);
        res.status(500).send('Something went wrong');
    }
});

// Route to add a new user
router.post("/addUser", (req, res) => {
    try {
        userService.addNewUser(req)
            .then((addUserResp) => {
                console.log("addUserResp; ", addUserResp);
                res.status(200).send(addUserResp);
            })
            .catch((err) => {
                console.log("err: ", err);
                res.status(400).send(err);
            });
    } catch (e) {
        console.log('catch in add user: ', e);
        res.status(500).send('Something went wrong');
    }
});

// Route to update an existing user by ID
router.patch("/updateUser/:id", (req, res) => {
    try {
        const id = req.params.id;
        userService.updateUser(id, req)
            .then((updateUserResp) => {
                res.status(200).send(updateUserResp);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    } catch (e) {
        console.log('catch in update user: ', e);
        res.status(500).send('Something went wrong');
    }
});

// Route to delete a user by ID
router.delete('/deleteUser/:id', (req, res) => {
    try {
        const id = req.params.id;
        userService.deleteUser(id)
            .then(() => {
                res.status(200).send(true);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    } catch (e) {
        console.log('catch in delete user: ', e);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;