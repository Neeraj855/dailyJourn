const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const _ = require('lodash');

const journals = []
let journal;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render('home', { journals });
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.get('/issues', (req, res) => {
    res.render('issues', { journals });
})


app.get("/create", (req, res) => {
    res.render('create')
});

app.post('/create', (req, res) => {
    journal = {
        title: req.body.journalTitle,
        content: req.body.journalBody
    };
    journals.push(journal);
    res.redirect('/')
});



app.get('/journals/:journalName', (req, res) => {

    const requestedTitle = _.lowerCase(req.params.journalName);

    journals.forEach((journal) => {

        const storedTitle = _.lowerCase(journal.title);
        if (storedTitle === requestedTitle) {
            res.render('post', {
                title: journal.title,
                content: journal.content
            });
        }
    });
})


app.listen(3000, () => {
    console.log("server is running at 3000");
});
