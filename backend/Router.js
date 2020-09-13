const bcrypt = require('bcrypt');

class Router {
    constructor(app, connection) {
        this.login(app, connection);
        this.logout(app, connection);
        this.isLoggedIn(app, connection);
    }

    login(app, connection) {
        app.post('/login', (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            
            username = username.toLowerCase(); //makes sure all users are consistent looking in lowercase
            
            if(username.length > 12 || password.lenth > 12) { //if password or username is bigger than 12 characters return a warning
                res.json({
                    success: false,
                    msg: 'An Error Occurred Please Follow The Login Guidelines'
                })
                return;
            }

            let cols = [username];
            connection.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data, fields) => {
                if (err) {
                    res.json ({
                        success: false,
                        msg: 'An Error Occurred, Please Try Again'
                    })
                    return; 
                }

                if (data && data.length === 1) { //If 1 user is found with this username

                    bcrypt.compare(password, data[0].password), (bcryptErr, verified) => {
                        if (verified) {
                            req.session.userID = data[0].id;
                            res.json({
                                success: true,
                                username: data[0].username
                            })

                            return;
                        }
                        else {
                            res.json({
                                success: false,
                                msg: 'Invalid Password'
                            })
                        }
                    };
                } else {
                    res.json ({
                        success: false,
                        msg: 'User not found, please try again'
                    })
                }
            });
        });
        
    }

        logout(app, connection){ //logout button
            app.post ('/logout', (req,res) => {
                if (req.session.userID) {
                    req.session.destroy();
                    res.json({
                        success: true
                    })

                    return true;
                } else {
                    res.json ({
                        success: false
                    })
                    return false;
                }
            });

        }

        isLoggedIn(app, connection){
            app.post('/isLoggedIn', (req, res) => {
                if (req.session.userID) {

                    let cols = [req.session.userID];
                    connection.query('SELECT * FROM user WHERE id = ? LIMIT 1', cols, (err, data, fields) => {
                        if (data && data.length === 1) {
                            res.json({
                                success: true,
                                username: data[0].username
                            })

                            return true;
                        } else {
                            res.json({
                                success: false
                           }) 
                        }
                    });
                }
                else {
                    res.json({
                        success: false
                    })
                }
            });

        }
}

module.exports = Router;