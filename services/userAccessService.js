const UserFeatureAccessRecord = require("../database/models/userFeatureAccess");
const User = require("../database/models/user");
const mongo = require("mongodb");

const service = {};

service.isAuthorised = async (userId, featureId) => {
    console.log(`userId: ${userId}, featureId: ${featureId}`);
    return await new Promise(async (resolve, reject) => {
        let hasAccess = false;

        console.log(typeof userId);
        
        const featureAccessList = await UserFeatureAccessRecord.findOne({ userId: userId });;
        console.log(featureAccessList);

        if (featureAccessList) {
            featureAccessList.featureIds.map((feature) => {
                console.log(`feature: ${typeof feature}, ${feature} ... featureId: ${typeof featureId}, ${featureId}`)
                if (feature == featureId) {
                    hasAccess = true;
                }
            });
        }

        console.log(hasAccess);
        return resolve(hasAccess);
    });
}

module.exports = service;