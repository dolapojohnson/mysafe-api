const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const BankSchema = new Schema({
    platform: { type: mongoose.SchemaTypes.String, required: true },
    // userid: { type: mongoose.SchemaTypes.ObjectId, required: true},
    email: { type: mongoose.SchemaTypes.String, required: true },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    created: { type: mongoose.SchemaTypes.Date, required: true}
});

//Create model
const Bank = mongoose.model('passwordbank', BankSchema);


module.exports = Bank;