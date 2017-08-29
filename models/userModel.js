const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    displayName: String,
    image: String,
    email: String,
    google: Object,
    twitter: Object,
    github: Object,
    linkedin: Object,
    facebook: Object
});

module.exports = mongoose.model('User', UserSchema);
