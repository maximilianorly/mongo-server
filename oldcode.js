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

    // let name = 'mm';
    // let email = 'mm@';
    // let password = 'qwert';
    
    // const user = new User({
    //     name: name,
    //     email: email,
    //     password: password
    // });
    // user.save();
    res.send('hello')
});

app.post('/users', (req, res) => {
    console.log('post hit')
    console.log(req.body)
    // let name = req.body.name;
    // let email = req.body.email;
    // let password = req.body.password;
    
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save(
    //     () => {
    //     try {
    //         res.send({
    //             success:true,
    //             message:'user successfully added'
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    ).catch((err) => {
        console.log(err)
    });

    res.send("success")
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