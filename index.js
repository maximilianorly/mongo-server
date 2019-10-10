const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const User = require('./models/user');
const app = express();

const port = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/signup', {
    useNewUrlParser: true
});

app.get('/', (req, res) => {
    res.send('hello')
});

app.post('/', (req, res) => {
    let name = req.body.name;

    const user = new User({
        name: name,
        email: email,
        password: password
    });
    user.save();
})
app.listen(port, () => {
    console.log('server party');
});



// const user = new User({
//     name:'Maximilian',
//     email:'maximilian@mail.com',
//     password:'mySuperSecretPassword'
// });

// // user.save();
// // users.find(user.name);

// User.find({}, (e, docs) => {
//     if(e) throw e

//     console.log(docs)
// })