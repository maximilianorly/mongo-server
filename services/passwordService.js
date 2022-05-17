const bcrypt = require("bcrypt");
const saltRounds = 10;

const service = {};

service.saltPassword = async (password) => {
    return await new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                console.log("salting error");
                console.log(err);
                reject(err);
            };
    
            bcrypt.hash(password, salt, (err, hash) => {
                console.log(`hash: ${hash}`);
    
                if (err) {
                    console.log("hashing error");
                    console.log(err);
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    });
}

module.exports = service;