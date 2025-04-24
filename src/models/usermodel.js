const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {  // Add role field
        type: String,
        required: true,
        enum: ['freelancer', 'client'],  // You can specify the possible roles
        default: 'freelancer'  // Default to 'user' if not specified
    }
});

module.exports = mongoose.model('User', userSchema);
