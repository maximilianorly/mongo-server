const mongoose = require('mongoose');

const userFeatureAccess = new mongoose.Schema({
    userId:{ type: String, required: true },
    featureIds: { type: Array, required: true }
});

module.exports = mongoose.model('userFeatureAccess', userFeatureAccess);