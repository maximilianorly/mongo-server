const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/user');
const app = express();

const port = 3005;


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

mongoose.connect('mongodb://localhost:27017/signup', {
    useNewUrlParser: true
});

app.get('/users', (req, res) => {
    res.send([{
        name: 'max',
        email: 'max@florist.com',
        password: 'pass'
    }]);

    res.send('hello')
});

app.post('/users', (req, res) => {
    console.log('post hit')
    console.log(req.body)
    
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save().catch((err) => {
        console.log(err)
    });

    res.send("success")
})

app.listen(port, () => {
    console.log('server party');
});
