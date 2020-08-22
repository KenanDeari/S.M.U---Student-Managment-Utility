var userId;
var usernameText;

var modal = new Vue({
    el: "#login-modal",
    data: {
        newUserObject: {
            email: "",
            username: "",
            password: ""
        },
        returningUserObject: {
            email: "",
            password: ""
        }
    },
    methods: {
        addNewUser: function() {
            
            $.ajax({
                type:"POST",
                url:"/add-new-user",
                data: this.newUserObject
            }).then(function(response){
                sessionStorage.usernameText = response.username;
                sessionStorage.userId = response.id;
                console.log( sessionStorage.usernameText, sessionStorage.userId);
            }); 
        },
        returningUser: function() {

            if (this.returningUserObject.email.length > 0 && this.returningUserObject.password.length > 0) {
                $.ajax({
                    type:"POST",
                    url:"/returning-user",
                    data: this.returningUserObject
                }).then(function(response){
                    sessionStorage.usernameText = response[0].username;
                    sessionStorage.userId = response[0]._id;
                    console.log( sessionStorage.usernameText, sessionStorage.userId);
                }); 
            } else {
                alert("Please fill in all fields");
            }
        }
    }
});

var index = new Vue({
  el: "#vueContainer",
  data: {
    selectedCategory: "Events",
    categories: ["Events", "Jobs", "Courses", "Videos"],
    seen: true,
    addCustom: false,
    customTitleInput: "",
    customURL: "",
    customJobSummary: "",
    customEmployer: "",
    customJobLocation: "",
    customArticleSummary: "",
    notebookResults: [],
    udemyResults: [],
    youtubeResults: [],
    jobResults: [],
    eventResults: [],
    articleResults: [],
    udemyLinks: [],
    searchInput: "",
    citySearchInput: "",
    stateSearchInput: "",
    jobKeywordInput: "",
    inputValue: "",
    activeDetails: {},
    newNotebookName: "",
    saveToNotebookName: "",
    notebookContents: [],
    activeNotebook: {},
    isLoggedIn: false,
    targets: [
        {
            category: "Notebooks",
            image: "../images/icon-home.png",
        },
        {
            category: "Events",
            image: "../images/icon-events.png",
        },
        {
            category: "Courses",
            image: "../images/icon-courses.png",
        },
        {
            category: "Jobs",
            image: "../images/icon-jobs.png",
        },
        {
            category: "Videos",
            image: "../images/icon-videos.png",
        },
        {
            category: "Articles",
            image: "../images/icon-articles.png",
        }
    ]
  },
  created: function() {
    var self = this;
    setInterval(function() {
        if (sessionStorage.userId) {
            self.isLoggedIn = true;
        }
        else {
            self.isLoggedIn = false;
        }
    }, 500);
    },
  methods: {
    logout: function() {
        sessionStorage.userId = "";
        sessionStorage.usernameText = "";
        console.log( sessionStorage.usernameText, sessionStorage.userId);
    },
    resetResults: function() {
        console.log("Reset results");
        this.udemyResults = [];
        this.youtubeResults = [];
        this.jobResults = [];
        this.eventResults = [];
        this.articleResults = [];
        this.activeDetails = {};
        this.saveToNotebookName = "";
    },
    modalToggle: function() {
        $("#login-modal").modal("toggle");
    },
    getCourses: function() {
        var self = this;
        console.log("Getting courses...");
        console.log(self.searchInput);
        $.ajax({
            type: "GET",
            url: "/udemy/" + self.searchInput
          }).then(function(response) {
              response = JSON.parse(response);
              self.udemyResults = response.results.map(function(course){
                  course.saved = false;
                  return course;
              });
          });
    },
    saveUdemyCourse: function(result) {
        var self = this;

        var courseObject = {
            courseData: {
                title: result.title,
                link: "https://www.udemy.com" + result.url,
                image: result.image_125_H
            },
            notebook: self.saveToNotebookName,
            user: sessionStorage.userId

        };
        $.ajax({
            type: "POST",
            url: "/save-course",
            data: courseObject
        }).then(function(response) {
            result.saved = true;
        });
    },
    saveCustomCourse: function() {
        var self = this;

        var courseObject = {
            courseData: {
                title: self.customTitleInput,
                link: self.customURL,
                image: "../images/icon-custom-course.png"
            },
            notebook: self.saveToNotebookName,
            user: sessionStorage.userId

        };
        $.ajax({
            type: "POST",
            url: "/save-course",
            data: courseObject
        }).then(function() {
            self.addCustom = false;
            self.customTitleInput = "";
            self.customURL = "";
        });
    },
    getVideos: function() {
        var self = this;
        console.log("Getting videos...");
        $.ajax({
            type: "GET",
            url: "/youtube/" + self.searchInput
          }).then(function(response) {
              self.youtubeResults = response.map(function(video){
                  video.saved = false;
                  return video;
              });
          });
    },
    saveVideo: function(result) {
        var self = this;

        var videoObject = {
            videoData: {
                title: result.title,
                link: 'https://www.youtube.com/watch?v=' + result.link,
                image: result.picture
            },
            notebook: self.saveToNotebookName,
            user: sessionStorage.userId
        };
        $.ajax({
            type: "POST",
            url: "/save-video",
            data: videoObject
        }).then(function() {
            result.saved = true;
        });
    },
    saveCustomVideo: function() {
        var self = this;

        var videoObject = {
            videoData: {
                title: self.customTitleInput,
                link: self.customURL,
                image: "../images/icon-custom-video.png"
            },
            notebook: self.saveToNotebookName,
            user: sessionStorage.userId
        };
        $.ajax({
            type: "POST",
            url: "/save-video",
            data: videoObject
        }).then(function(response) {
            self.addCustom = false;
            self.customTitleInput = "";
            self.customURL = "";
        });
    },
    getEvents: function() {
        self = this;
        console.log("Getting events...");
        $.ajax({
            type: "GET",
            url: "/meetup"
          }).then(function(response) {
              self.eventResults = response.map(function(event){
                  event.saved = false;
                  return event;
              });
          });
    },
    saveEvent: function(result) {
        var self = this;

        var eventObject = {
            eventData: {
                title: result.title,
                link: result.link,
                image: "../images/meetup.png"
            },
            notebook: self.saveToNotebookName,
            user: sessionStorage.userId
        };
        $.ajax({
            type: "POST",
            url: "/save-event",
            data: eventObject
        }).then(function(response) {
            result.saved = true;
        });
    },
    saveCustomEvent: function() {
        var self = this;

        var eventObject = {
            eventData: {
                title: self.customTitleInput,
                link: self.customURL,
                image: "../images/icon-custom-event.png"
            },
            notebook: self.saveToNotebookName,
            user: sessionStorage.userId
        };
        $.ajax({
            type: "POST",
            url: "/save-event",
            data: eventObject
        }).then(function() {
            self.addCustom = false;
            self.customTitleInput = "";
            self.customURL = "";
        });
    },
    getJobs: function() {
        self = this;
        console.log("Getting jobs...");
        $.ajax({
            type: "POST",
            url: "/indeed",
            data: {
                city: self.citySearchInput,
                keyword: self.jobKeywordInput
            }
          }).then(function(response) {
            self.jobResults = response.map(function(job){
                job.saved = false;
                return job;
            });
            self.citySearchInput = "";
            self.jobKeywordInput = "";
          });
    },
    saveJob: function(result) {
        var self = this;

        var jobObject = {
            jobData: {
                title: result.title,
                link: result.url,
                image: "../images/indeed.png",
                summary: result.summary,
                company: result.company,
                location: result.location
            },
            notebook: self.saveToNotebookName,
            user: sessionStorage.userId
        };
        $.ajax({
            type: "POST",
            url: "/save-job",
            data: jobObject
        }).then(function(response) {
            result.saved = true;
        });
    },
    saveCustomJob: function() {
        var self = this;

        var jobObject = {
            jobData: {
                title: self.customTitleInput,
                link: self.customURL,
                image: "../images/icon-custom-job.png",
                summary: self.customJobSummary,
                company: self.customEmployer,
                location: self.customJobLocation
            },
            notebook: self.saveToNotebookName,
            user: sessionStorage.userId
        };
        $.ajax({
            type: "POST",
            url: "/save-job",
            data: jobObject
        }).then(function() {
            self.addCustom = false;
            self.customTitleInput = "";
            self.customURL = "";
            self.customJobSummary = "";
            self.customEmployer = "";
            self.customJobLocation = "";
        });
    },
    getArticles: function() {
        var self = this;
        $.ajax({
            type:"GET",
            url:"/articles/"
        }).then(function(response) {
            self.articleResults = response.map(function(article){
                article.saved = false;
                return article;
            });
        });
    },
    saveArticle: function(result) {
        var self = this;

        var articleObject = {
            articleData: {
                title: result.title,
                link: result.link,
                summary: result.summary
            },
            notebook: self.saveToNotebookName,
            user: sessionStorage.userId
        };
        $.ajax({
            type: "POST",
            url: "/save-article",
            data: articleObject
        }).then(function(response) {
            result.saved = true;
        });
    },
    saveCustomArticle: function() {
        var self = this;
        console.log("line 408");
        var articleObject = {
            articleData: {
                title: self.customTitleInput,
                link: self.customURL,
                summary: self.customArticleSummary
            },
            notebook: self.saveToNotebookName,
            user: sessionStorage.userId
        };
        $.ajax({
            type: "POST",
            url: "/save-article",
            data: articleObject
        }).then(function() {
            console.log("line 423");
            self.addCustom = false;
            self.customTitleInput = "";
            self.customURL = "";
            self.customArticleSummary = "";
        });
    },
    getNotebookList: function() {
        var self = this;
        $.ajax({
            type:"GET",
            url:"/render-notebooks/" + sessionStorage.userId
        }).then(function(response) {
            self.notebooksList = response;
            self.renderNotebookList(self.notebooksList);
        });
    },
    renderNotebookList: function(notebooksList) {
        var self = this;
        self[self.resultKey] = self.notebooksList;
    },
    addNotebook: function() {
        var self = this;
        $.ajax({
            type:"POST",
            url:"/add-notebook/" + sessionStorage.userId,
            data: {
                name: this.newNotebookName,
                user: sessionStorage.userId
            }
        }).then(function(response){
            self.getNotebookList();
            self.newNotebookName = "";

        }); 
    },
    deleteNotebook: function(result) {
        var self = this;
        $.ajax({
            type: "DELETE",
            url: "/delete-notebook/" + result._id
        }).then(function(response) {
           console.log("deleting notebook...");
           self.getNotebookList();
        });
    }
  },
  computed: {
      showNotebookList: function() {
        return this.activeDetails.category === 'Notebooks'
      },
      resultKey: function() {
        if (this.activeDetails.category === "Events") {
            return "eventResults";
        } 
        else if (this.activeDetails.category === "Jobs") {
            return "jobResults";
        } 
        else if (this.activeDetails.category === "Courses") {
            return "udemyResults";
        }
        else if (this.activeDetails.category === "Videos") {
            return "youtubeResults";
        }
        else if (this.activeDetails.category === "Notebooks") {
            return "notebookResults";
        }
      },
      searchURL: function() {
        if (this.activeDetails.category === "Events") {
            return "/meetup/" + this.searchInput;
        } 
        else if (this.activeDetails.category === "Jobs") {
            console.log("Find Jobs");
        } 
        else if (this.activeDetails.category === "Courses") {
            return "/udemy/" + this.searchInput;
        }
        else if (this.activeDetails.category === "Videos") {
            return "/youtube/" + this.searchInput;
        }
      },
      renderTarget: function() {
        if (this.activeDetails.category === "Events") {
            console.log("Render Events");
        } 
        else if (this.activeDetails.category === "Jobs") {
            console.log("Render Jobs");
        } 
        else if (this.activeDetails.category === "Courses") {
            console.log("Render Courses");
        }
        else if (this.activeDetails.category === "Videos") {
            console.log("Render Videos");
        }
        else if (this.activeDetails.category === "Notebooks") {
            console.log("Render Notebooks");
            this.getNotebookList();
        }
      },
  },
  watch: {
      activeDetails: function(val, oldVal) {
        if (val.category ===  "Notebooks") {
            this.getNotebookList();
        }
        else if (val.category ===  "Events") {
            this.getEvents();
        }
        else if (val.category ===  "Articles") {
            this.getArticles();
            }
      },
      buttonPulse: function() {
          console.log("Found no user logged in.");
          if (!sessionStorage.userId) {
            this.pulseAnimation = true;
          }   
      }
  }
});

