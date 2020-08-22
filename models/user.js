var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    type: mongoose.Schema.Types.Mixed,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    notebook:[
        {
            type: Schema.Types.ObjectId,
            ref: "Notebook"
        }
    ]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;

