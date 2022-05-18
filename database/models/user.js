const mongoose = require('mongoose');

const user = new mongoose.Schema({
    _id: {type: String},
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true}
});

module.exports = mongoose.model('users', user);