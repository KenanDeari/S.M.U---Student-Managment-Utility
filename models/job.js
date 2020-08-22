var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var JobSchema = new Schema({
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
    summary: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    saved: {
        type: Boolean,
        default: false
    }
});

var Job = mongoose.model("Job", JobSchema);

module.exports = Job;