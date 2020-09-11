const db = require("../models");
var request = require("request");

module.exports = function (app) {

    var indeed = require('indeed-scraper');
    var cheerio = require("cheerio");

    app.post("/add-new-user", function (req, res) {
        db.User.create(req.body)
            .then(function (dbUser) {
                return dbUser;
            }).then(function (dbUser) {
                const user = {
                    id: dbUser._id,
                    username: dbUser.username
                };
                res.json(user);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.post("/returning-user", function (req, res) {
        db.User.find(
            { email: req.body.email, password: req.body.password }
        ).then(function (data) {
            res.json(data);
        });
    });

    app.get("/udemy/:udemyQuery", function (req, res) {
        var udemyQuery = req.params.udemyQuery;

        request({
            url: "https://www.udemy.com/api-2.0/courses/?search=" + udemyQuery + "&page=2&page_size=12",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Authorization": process.env.UDEMY_API_KEY,
                "Content-Type": "application/json;charset=utf-8"
            }
        }, function (err, raw, body) {
            res.json(body);
        });
    });

    app.post("/save-course", function (req, res) {
        db.Course.create(req.body.courseData)
            .then(function (dbCourse) {
                return db.Notebook.findOneAndUpdate({ name: req.body.notebook, user: req.body.user }, { $push: { course: dbCourse._id } }, { new: true });
            })
            .then(function (dbNotebook) {
                res.json(dbNotebook)
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/delete-course/:courseId", function (req, res) {
        db.Course.findByIdAndRemove(req.params.courseId, (err, course) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        });
    });

    app.get("/youtube/:youTubeQuery", function (req, res) {
        var youTubeQuery = req.params.youTubeQuery;
        request({
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + youTubeQuery + "&type=video&key=" + process.env.YOU_TUBE_API,

        }, function (err, raw, body) {
            var cleanYouTube = []
            for (var i = 0; i < JSON.parse(body).items.length; i++) {
                var singleYoutube = {
                    link: JSON.parse(body).items[i].id.videoId,
                    picture: JSON.parse(body).items[i].snippet.thumbnails.default.url,
                    title: JSON.parse(body).items[i].snippet.title
                };
                cleanYouTube.push(singleYoutube);
            }
            res.json(cleanYouTube);
        });
    });

    app.post("/save-video", function (req, res) {
        db.Video.create(req.body.videoData)
            .then(function (dbVideo) {
                return db.Notebook.findOneAndUpdate({ name: req.body.notebook, user: req.body.user }, { $push: { video: dbVideo._id } }, { new: true });
            })
            .then(function (dbNotebook) {
                res.json(dbNotebook)
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/delete-video/:videoId", function (req, res) {
        db.Video.findByIdAndRemove(req.params.videoId, (err, video) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        });
    });

    app.get("/meetup", function (req, res) {
        request({
            url: "https://api.meetup.com/find/upcoming_events?&photo-host=public&topic_category=34&page=10&radius=50&key=" + process.env.MEET_UP_KEY
        }, function (err, raw, body) {
            var cleanMeetup = [];
            for (var i = 0; i < JSON.parse(body).events.length; i++) {
                var singleMeetup = {
                    title: JSON.parse(body).events[i].name,
                    link: JSON.parse(body).events[i].link
                };
                cleanMeetup.push(singleMeetup);
            }
            res.json(cleanMeetup);
        });
    });

    app.post("/save-event", function (req, res) {
        db.Event.create(req.body.eventData)
            .then(function (dbEvent) {
                return db.Notebook.findOneAndUpdate({ name: req.body.notebook, user: req.body.user }, { $push: { event: dbEvent._id } }, { new: true });
            })
            .then(function (dbNotebook) {
                res.json(dbNotebook);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/delete-event/:eventId", function (req, res) {
        db.Event.findByIdAndRemove(req.params.eventId, (err, event) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        });
    });

    app.post("/indeed", function (req, res) {
        const queryOptions = {
            query: req.body.keyword,
            city: req.body.city,
            radius: '50',
            level: 'entry_level',
            jobType: 'fulltime',
            maxAge: '7',
            sort: 'date',
            limit: '20'
        };
        indeed.query(queryOptions).then(data => {
            res.json(data);
        });
    });

    app.post("/save-job", function (req, res) {
        db.Job.create(req.body.jobData)
            .then(function (dbJob) {
                return db.Notebook.findOneAndUpdate({ name: req.body.notebook, user: req.body.user }, { $push: { job: dbJob._id } }, { new: true });
            })
            .then(function (dbNotebook) {
                res.json(dbNotebook);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/delete-job/:jobId", function (req, res) {
        db.Job.findByIdAndRemove(req.params.jobId, (err, job) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        });
    });

    app.get("/articles", function (req, res) {
        request("https://www.geekwire.com/?s=coding", function (error, response, html) {
            var $ = cheerio.load(html);
            var articles = [];
            $("article.teaser").each(function (i, element) {
                var title = $(element).find(".entry-title").text();
                var link = $(element).find(".entry-title > a").attr("href");
                var summary = $(element).find(".entry-summary > p").text();

                if (title && link) {
                    articles.push({
                        title: title,
                        link: link,
                        summary: summary
                    });
                }

            });
            res.json(articles);
        });
    });

    app.post("/save-article", function (req, res) {
        db.Article.create(req.body.articleData)
            .then(function (dbArticle) {
                return db.Notebook.findOneAndUpdate({ name: req.body.notebook, user: req.body.user }, { $push: { article: dbArticle._id } }, { new: true });
            })
            .then(function (dbNotebook) {
                res.json(dbNotebook);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/delete-article/:articleId", function (req, res) {
        db.Article.findByIdAndRemove(req.params.articleId, (err, article) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        });
    });

    app.post("/save-note", function (req, res) {
        db.Note.create(req.body.noteBody)
            .then(function (dbNote) {
                return db.Notebook.findOneAndUpdate({ name: req.body.notebook, user: req.body.user }, { $push: { note: dbNote._id } }, { new: true });
            })
            .then(function (dbNotebook) {
                res.json(dbNotebook);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/delete-note/:noteId", function (req, res) {
        db.Note.findByIdAndRemove(req.params.noteId, (err, note) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        });
    });

    app.post("/add-notebook/:userId", function (req, res) {
        var userId = req.params.userId;
        db.Notebook.create(req.body)
            .then(function (dbNotebook) {
                return db.User.findOneAndUpdate({ _id: userId }, { $push: { notebook: dbNotebook._id } }, { new: true });
            }).then(function (dbNotebook) {
                res.json(dbNotebook);
            }).catch(function (err) {
                res.json(err);
            });
    });


    app.get("/render-notebooks/:userId", function (req, res) {
        db.User.findById(req.params.userId)
            .populate("notebook")
            .then(function (dbUser) {
                res.json(dbUser.notebook);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/render-notebook-contents/:notebookName", function (req, res) {
        db.Notebook.findById(req.params.notebookName)
            .populate("course")
            .populate("video")
            .populate("event")
            .populate("job")
            .populate("article")
            .populate("note")
            .then(function (dbNotebook) {
                res.json(dbNotebook);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/delete-notebook/:notebookId", (req, res) => {
        db.Notebook.findByIdAndRemove(req.params.notebookId, (err, notebook) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        });
    });

};