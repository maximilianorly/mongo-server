const { Router } = require("express");
const passwordService = require("../services/passwordService");

const router = new Router();

const User = require("../models/user");

router.get('/', async (req, res) => {;
    const users = await User.find();

    res.send(users);
});

router.post('/', async (req, res) => {
    const _pwd = await passwordService.saltPassword(req.body.password);
    console.log(_pwd);

    const user = new User({
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

router.delete("/", async (req, res) => {
    const deleted = await User.deleteMany({  });

    if (deleted.deletedCount > 0) {
        res.send(`Success, ${deleted.deletedCount} documents deleted.`);
    } else {
        res.send("There were no documents to delete.");
    }
});

module.exports = router;