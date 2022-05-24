require('dotenv').config();
const express = require('express')
const cors = require('cors');
const passportSetup = require('./services/passport-setup');
const db = require('./db');
const passport = require('passport');
const app = express()
const port = process.env.PORT || 8080;
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
const path = require("path");

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
    maxAge: 3600 * 24 * 1000,
    keys: [process.env.COOKIE_SECRET]
}))


app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRouter);
app.use('/task', taskRouter);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/get-user', (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})