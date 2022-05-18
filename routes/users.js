const { Router } = require("express");
const passwordService = require("../services/passwordService");
const mongo = require("mongodb");

const router = new Router();

const User = require("../database/models/user");

// DEBUG ONLY
router.get('/', async (req, res) => {
    const users = await User.find();

    res.send(users);
});

// Create user
router.post('/', async (req, res) => {
    const _pwd = await passwordService.saltPassword(req.body.password);
    console.log(_pwd);

    const user = new User({
        _id: new mongo.ObjectId().toString(),
        username: req.body.username,
        email: req.body.email,
        password: _pwd
    });


    const db = user.save().catch((err) => {
        console.log('error');
        console.log(err);
    });

    res.send(db);
});

// DEBUG ONLY
router.delete("/", async (req, res) => {
    const deleted = await User.deleteMany({  });

    if (deleted.deletedCount > 0) {
        res.send(`Success, ${deleted.deletedCount} documents deleted.`);
    } else {
        res.send("There were no documents to delete.");
    }
});

module.exports = router;