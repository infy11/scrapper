const httpStrategy = require('passport-http');
const Passport = require('passport')


Passport.use(new httpStrategy.BasicStrategy(
    function(username, password, done) {
        const USERNAME = process.env.USERNAME;
        const PASSWORD  = process.env.PASSWORD;
        if(username.toLowerCase().trim() === USERNAME && password.toLowerCase().trim() === PASSWORD) {
            return done(null,{valid:true})
        }
        else {
            done(false);
        }
    }
));


module.exports = Passport;
