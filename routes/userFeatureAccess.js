const { Router } = require("express");
const mongo = require("mongodb");
const userAccessService = require("../services/userAccessService");

const router = new Router();

const UserFeatureAccessRecord = require("../database/models/userFeatureAccess");

function Response(isSuccessful, message, statusCode) {
    this.isSuccessful = isSuccessful;
    this.message = message;
    this.statusCode = statusCode; 
};

router.get("/access/:featureId", async (req, res) => {
    let response = new Response(false, "", 403);

    if (!req.isAuthenticated()) {
        response.message = "Authentication required, please log in";
        return res.send(response);
    }

    const hasAccess = await userAccessService.isAuthorised(req.user._id, req.params.featureId);

    response.isSuccessful = hasAccess;

    if (response.isSuccessful) {
        response.message = "Access granted";
        response.statusCode = 200;
    } else {
        response.message = "Access denied";
        response.statusCode = 403;
    }

    res.send(response);
});








// DEBUG ONLY
// Get all user access documents
router.get('/', async (req, res) => {
    let response = new Response(false, "", 403);
    response.isSuccessful = true;
    const userFeatureAccessRecords = await UserFeatureAccessRecord.find();

    if (userFeatureAccessRecords) {
        response.message = userFeatureAccessRecords;
        response.statusCode = 200;
    } else {
        response.statusCode = 204
    }
    res.send(response);
});

// DEBUG ONLY
// Add new user access documents
router.post('/', async (req, res) => {
    let response = new Response(false, "", 403);

    const userFeatureAccessRecord = new UserFeatureAccessRecord({
        userId: req.body.userId,
        featureIds: []
    });

    console.log(userFeatureAccessRecord);

    req.body.featureList.split(",").map(feature => userFeatureAccessRecord.featureIds.push(feature));

    const db = userFeatureAccessRecord.save().catch((err) => {
        console.log('error');
        console.log(err);
        response.message = error;
        response.statusCode = 500;
        res.send(response);
    });

    response.message = "User Access document added";
    response.statusCode = 200;

    res.send(response);
});

// DEBUG ONLY
// Delete all user access documents
router.delete("/", async (req, res) => {
    let response = new Response(false, "", 403);

    const deleted = await UserFeatureAccessRecord.deleteMany({  });

    response.isSuccessful = true;
    response.statusCode = 200;

    if (deleted.deletedCount > 0) {
        response.message = `Success, ${deleted.deletedCount} documents deleted.`;
        res.send(response);
    } else {
        response.isSuccessful = true;
        response.message = "There were no documents to delete."
        res.send(response);
    }
});

module.exports = router;