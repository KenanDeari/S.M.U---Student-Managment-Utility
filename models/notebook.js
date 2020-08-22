var mongoose = require("mongoose");
var db = require("./index");

var Schema = mongoose.Schema;

var NotebookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  event: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  video: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  course: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  job: [
    {
      type: Schema.Types.ObjectId,
      ref: "Job"
    }
  ],
  article: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article"
    }
  ],
  note: [
    {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
]
});

NotebookSchema.pre("remove", function(dbNotebook) {
console.log(dbNotebook);
  var promises = [
    ...dbNotebook.event.map(id => db.Event.findByIdAndRemove(id)),
    ...dbNotebook.course.map(id => db.Course.findByIdAndRemove(id)),
    ...dbNotebook.video.map(id => db.Video.findByIdAndRemove(id)),
    ...dbNotebook.job.map(id => db.Job.findByIdAndRemove(id)),
    ...dbNotebook.article.map(id => db.Article.findByIdAndRemove(id))
  ];

  Promise.all(promises)
    .then(function() {
        console.log("Cascaded Notebook associations!");
    });
});

var Notebook = mongoose.model("Notebook", NotebookSchema);

module.exports = Notebook;
