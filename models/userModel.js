const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    email: { type: mongoose.SchemaTypes.String, required: true },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
        // select: false
    },
    created: { type: mongoose.SchemaTypes.Date, required: true}
});

//Create model
const User = mongoose.model('myuser', UserSchema);


module.exports = User;