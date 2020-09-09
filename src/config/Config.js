module.exports.sitesConfig = {
    github: {
        url: "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"
    },
    monster: {
        url: "https://www.indeed.com"
    },
    jooble: {
        url: "https://cors-anywhere.herokuapp.com/https://jooble.org/api/",
        API_KEY: process.env['REACT_APP_API_KEY']
    }
}
