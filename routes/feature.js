const { Router } = require("express");

const router = new Router();

const Feature = require("../database/models/feature");

let response = { isSuccessful: false, message: "", statusCode: 403 };

// Get all features
router.get('/', async (req, res) => {
    const features = await Feature.find();

    response.isSuccessful = true;
    response.message = features;
    response.statusCode = 200;

    res.send(features);
});

// DEBUG ONLY
// Add new feature
router.post('/', async (req, res) => {
    const feature = new Feature({
        name: req.body.name
    });

    const db = feature.save().catch((err) => {
        console.log('error');
        console.log(err);
    });

    res.send(db);
});

// DEBUG ONLY
// Delete all features
router.delete("/", async (req, res) => {
    const deleted = await Feature.deleteMany({  });

    if (deleted.deletedCount > 0) {
        res.send(`Success, ${deleted.deletedCount} documents deleted.`);
    } else {
        res.send("There were no documents to delete.");
    }
});

module.exports = router;