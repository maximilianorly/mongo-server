const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const store = new session.MemoryStore();

const local = require("./strategies/local")

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const app = express();

const port = 3005;

app.use(session({
    secret: "my session secret",
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    store
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

mongoose.connect("mongodb://localhost:27017/signup", {
    useNewUrlParser: true
});

app.get("/", async (req, res) => {
    console.log("successful get");
    res.send("success");
});

app.get("/session", async (req, res) => {
    console.log(req.isAuthenticated());
    console.log(req.user);
})

app.use("/users", usersRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
