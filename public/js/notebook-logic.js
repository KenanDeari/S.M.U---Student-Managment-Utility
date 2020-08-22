new Vue({
    el: "#vueContainer",
    data: {
        noteBody: "",
        notebookName: "",
        notebookVideos: [],
        notebookEvents: [],
        notebookCourses: [],
        notebookJobs: [],
        notebookArticles: [],
        notebookNotes: []
    },

    created: function() {
        this.getNotebookContents();
    },

    methods: {
        saveNote: function() {
            var self = this;
            var noteObject = {
                noteBody: {
                    text: self.noteBody
                },
                notebook: self.notebookName,
                user: sessionStorage.userId
            };
            $.ajax({
                type: "POST",
                url: "/save-note",
                data: noteObject
            }).then(function(response) {
                self.noteBody = "";
                self.getNotebookContents();
            });
        },
        modalToggle: function() {
            $("#login-modal").modal("toggle");
        },
        getNotebookContents: function() {
            var self = this;
            $.ajax({
                type:"GET",
                url:"/render-notebook-contents/" + window.location.pathname.split("/")[2]
            }).then(function(response) {
                self.notebookName = response.name;
                self.notebookCourses = response.course;
                self.notebookEvents = response.event;
                self.notebookJobs = response.job;
                self.notebookVideos = response.video;
                self.notebookArticles = response.article;
                self.notebookNotes = response.note;
                console.log(self.notebookNotes);
            });
        },
        deleteCourse: function(course) {
            var self = this;
            $.ajax({
                type: "DELETE",
                url: "/delete-course/" + course._id
            }).then(function(response) {
                self.getNotebookContents();
            });
        },
        deleteVideo: function(video) {
            var self = this;
            $.ajax({
                type: "DELETE",
                url: "/delete-video/" + video._id
            }).then(function(response) {
                self.getNotebookContents();
            });
        },
        deleteEvent: function(event) {
            var self = this;
            $.ajax({
                type: "DELETE",
                url: "/delete-event/" + event._id
            }).then(function(response) {
                self.getNotebookContents();
            });
        },
        deleteJob: function(job) {
            var self = this;
            $.ajax({
                type: "DELETE",
                url: "/delete-job/" + job._id
            }).then(function(response) {
                self.getNotebookContents();
            });
        },
        deleteArticle: function(article) {
            var self = this;
            $.ajax({
                type: "DELETE",
                url: "/delete-article/" + article._id
            }).then(function(response) {
                self.getNotebookContents();
            });
        },
        deleteNote: function(note) {
            var self = this;
            $.ajax({
                type: "DELETE",
                url: "/delete-note/" + note._id
            }).then(function(response) {
                self.getNotebookContents();
            });
        }
    }
});

