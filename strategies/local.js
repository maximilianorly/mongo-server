const LocalStrategy = require("passport-local");
const passport = require("passport");
const User = require('../models/user');
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
    console.log("serialising");
    console.log(user);
    done(null, user._id);
});

passport.deserializeUser(async (UUID, done) => {
    console.log("DESERIALIZING");
    console.log(UUID);
    try {
        const result = await User.findOne({ _id: `${UUID}` });

        console.log(result);
        if (result) {
            done(null, result);
        }
    } catch(err) {
        done(err, false);
    }
});

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const result = await User.findOne({ username: `${username}` });
            
            console.log(`comparing ${password} to ${result.password}`);
            if (result !== null) {
                if (await bcrypt.compare(password, result.password)) {
                    console.log("match");
                    done(null, result);
                } else {
                    console.log(" no match");
                    done(null, false);
                }
            } else {
                done(null, false);
            }
        } catch(err) {
            done(err, false);
        }
    }
));

