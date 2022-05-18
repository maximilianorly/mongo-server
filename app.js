const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const store = new session.MemoryStore();

const local = require("./strategies/local")

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const featureRoute = require("./routes/feature");
const userFeatureAccessRoute = require("./routes/userFeatureAccess");

const app = express();

const port = 3005;

let response = { isSuccessful: false, message: "", statusCode: 403 };

// Using Express-Session to store session data
app.use(session({
    secret: "my session secret",
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    store
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// DB Connection
mongoose.connect("mongodb://localhost:27017/signup", {
    useNewUrlParser: true
});

app.get("/", async (req, res) => {
    response.isSuccessful = true;
    response.message = "Swiftcase Auth"
    response.statusCode = 200;
    res.send(response);
});

// DEBUG ONLY
// Test Active authenticated session
app.get("/session", (req, res) => {
    console.log(req.isAuthenticated());
    console.log(req.user);
    if (req.isAuthenticated()) {
        response.isSuccessful = true;
        response.message = req.user;
        response.statusCode = 200;
    } else {
        response.isSuccessful = false;
        response.message = "Authentication required, please log in";
        response.statusCode = 401;
    }
    res.send(response);
})

// HTTP Controllers
app.use("/users", usersRoute);
app.use("/auth", authRoute);
app.use("/feature", featureRoute);
app.use("/userFeatureAccess", userFeatureAccessRoute);

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
