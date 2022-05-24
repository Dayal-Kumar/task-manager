const passport = require('passport');
const User = require("../models/User");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'api/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({googleID: profile.id}, (err, user) => {
            if(!user){
                user = new User({
                    username: profile.displayName,
                    googleID: profile.id,
                    tasks: [],
                    people: ['Self']
                });
                user.save((err) => {
                    if(err) console.log(err);
                });
            }
            console.log('User: ' + user)
            done(err, user);
        });
    }));
