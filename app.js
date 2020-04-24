require('dotenv').config();
const express = require('express');

let app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    if (!req.query.token) {
        res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URL)}&scope=user-read-private%20user-read-email&response_type=token&state=123`)
    } else {
        res.render('index');
    }
});

app.get('/train', (req, res) => {
    if (!req.query.token || !req.query.id) {
        res.redirect('/');
    } else {
        res.render('train');
    }
});

app.get('/spotify/callback', (req, res) => {
    res.send(`<script>window.location.href = "${process.env.IS_DEV == 'true' ? process.env.DEV_BASE : process.env.PROD_BASE}?token=" + (new RegExp(/(?<=access_token=)[^&]*/i)).exec(window.location.hash).shift();</script>`)
});

app.listen(5050, '0.0.0.0', console.log('listeing....'));