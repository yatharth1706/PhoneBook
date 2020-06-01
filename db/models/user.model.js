const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// create user schema

// JWT secret
const jwtSecret = "2983498273984789273947890198238129";

const UserSchema = new monoose.Schema({
    email : {
        type: String,
        trim: true,
        minlength : 1,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength : 8
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt : {
            type : Number,
            required: true
        }
    }]
})

// *** Instance Methods *** //

// 1st Instance method
// Purpose: To overwrite toJson method of this schema and return only email and 
// omit password and sessions

UserSchema.methods.toJson = function() {
    const user = this;
    const userObject = user.toObject();

    // return the document except password and sessions .. for that we need lodash lib
    return _.omit(userObject, ['password','sessions']);

}

// 2nd instance method
// Purpose: generate access token

UserSchema.methods.generateAccessAuthToken = function() {
    const user = this;
    return new Promise((resolve, reject) => {
        // create a JSON web token and return it
        jwt.sign({ _id: user._id.toHexString() }, jwtSecret, {expiresIn: "15m"}, (e,token) => {
            if(!e){
                resolve(token)
            }else{
                // error
                reject();
            }
        })
    })
}


// 3nd instance method
// Purpose: generate Refresh access token

UserSchema.methods.generateRefreshAccessAuthToken = function() {
    const user = this;
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buffer) => {
            if(!err){
                let token = buf.toString('hex');

                return resolve(token);
            }
        })       
        
    })
}

// 4rth instance method
// Purpose: create sessions

UserSchema.methods.createSession = function() {
    const user = this;
    
    return user.generateRefreshAccessAuthToken().then((refreshToken) => {
        return saveSessionDatabase(user, refreshToken);
    }).then((refreshToken) => {
        // saved to database successfully 
        // now return refreshToken
        return refreshToken
    }).catch((e) => {
        return Promise.reject("Failed to save session to database!! \n" + e);
    })
}


// ** Helper Methods ** //

let saveSessionDatabase = (user, refreshToken) => {
    // save session to database
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();

        user.sessions.push({
            "token" : refreshToken,
            expiresAt
        });

        user.save().then(() => {
            // saved session successfully
            return resolve(refreshToken);
        }).catch((e) => {
            return reject(e);
        })
    })
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "10";
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60 ) * 60;
    return (Date.now() / 1000) + secondsUntilExpire);
} 


// ** Modal Methods (Static Methods) ** //

UserSchema.statics.findIdAndToken = (_id,token) => {
    // find user by id and token
    // used in auth middleware (verifySession)
    const user = this;

    return user.findOne({
        _id,
        'session.token':token
    })
}

UserSchema.statics.findByCredentials = (email, password) => {
    const user = this;

    // we will create one middleware to decrypt and encryt our password first
}