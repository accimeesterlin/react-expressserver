const connection = require("./db"); // connection
const LocalStrategy = require("passport-local");
module.exports = (passport) => {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM user WHERE id = ", [id], (err, user) => {
            done(err, user);
        });
    });

    // Sign Up
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        session: false
    },
        function (username, password, done) {
            
            connection.query("SELECT * FROM users WHERE username = ?", [username], (err, current_user) => {
                if (err) {
                    return done(null, false);
                } else {
                    
                    // TODO
                    // We need to create the user
                    const new_user = {
                        username,
                        password
                    }; // user

                    connection.query("INSERT INTO users SET ?", new_user, (error, user) => {
                        if (err) {
                            console.log("Insert does not work: ");
                            return done(null, false);
                        } else {
                            console.log("Insert works: ", user);
                            return done(null, user);
                        }
                    });
                }
            }); // mysql
        }
    ));
};