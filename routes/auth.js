const { Router } = require("express");
const passport = require("passport");

const router = new Router();

let response = { isSuccessful: false, message: "", statusCode: 403 };

// Login
router.post("/login", passport.authenticate("local"), (req, res) => {
    response.isSuccessful = true;
    response.message = "Login successful";
    response.statusCode = 200;
    res.send(response);
})

// Logout
router.get("/logout", (req, res) => {
    if (req.isAuthenticated()) {
        console.log("logging out");
        req.logout();
        console.log("logged out");
        response.isSuccessful = true;
        response.message = "Successfully logged out";
        response.statusCode = 200;
        res.send(response);
    } else {
        response.isSuccessful = false;
        response.message = "Session Expired"
        response.statusCode = 401
        res.send(response);
    }
});

module.exports = router;