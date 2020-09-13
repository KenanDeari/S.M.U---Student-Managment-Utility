require('dotenv').config(); // added .env file to secure key. 
const express=require('express');
const app=express();
const path=require('path');
const mysql=require('mysql');
const session=require('express-session');
const MySQLStore=require('express-mysql-session')(session);
const Router=require('./Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//DB Database
// console.log (process.env.JAWSDB_URL)
if(process.env.JAWSDB_URL) {
    var connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {

    var connection = mysql.createConnection({ //Connect to the JawsDB database on Heroku
    // const db=mysql.createConnection({
        host:'localhost',
        user: 'root',
        password:'',
        database: 'JawsDB',
    });
}
connection.connect(function(err) { // If DB error throw error.
    if (err) {
        console.log('DB error');
        throw err;
        return false;
    }
});

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000), // Expiration of the store 5 years
    endConnectionOnClose: false  //End database connection when store is closed
}, connection);

app.use(session({
    key:'kapsdof08902495jad', //random
    secret: 'aofkasmdf20492jskdfas', //random
    store: sessionStore,
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000), //5 years miliseconds
        httpOnly: false //want it to be https too
    }
}));

new Router(app, connection);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000)