const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3600;
const app = express();

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/now-what";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function() {
  console.log("Server is running on port:", PORT);
});
