var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EventSchema = new Schema({
    title: {
        type: String,
        required: true              
    },
    link: {
        type: String,
        required: true              
    },
    image: {
        type: String,
        required: false              
    },
    saved: {
        type: Boolean,
        default: false
    }
});

var Event = mongoose.model("Event", EventSchema);

module.exports = Event;