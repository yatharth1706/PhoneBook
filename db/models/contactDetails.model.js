const mongoose = require('mongoose');

// create details Schema storing contact details
const contactDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: String,
        required: true
    },
    phoneNumbers : [
        { type: Number }
    ],
    emails: [
        { type: String }
    ]
})

// create a model of detailSchema

const ContactDetails = new mongoose.model('ContactDetails', contactDetailSchema);

module.exports = {
    ContactDetails
}