var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    }
});

//   note: {
//     type: [{ 
//       type: Schema.Types.ObjectId,
//       ref: "Note" 
//     }],
//     article: String
//   },

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;