const mongoose = require('mongoose');

const feature = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('features', feature);