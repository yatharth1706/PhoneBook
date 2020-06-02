const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');

// database connectivity code
const {mongoose} = require('./db/mongoose')
// contact Details model code
const { ContactDetails, User } = require('./db/models');

/* MIDDLEWARE */
// bodyparser in middleware to extract properties from request body
app.use(bodyParser.json());

// give access of dist folder containing frontend to express
var distDir = __dirname + "/dist/frontend-phoneBook";
app.use(express.static(distDir));




//CORS headers middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Verify Refresh Token Middleware (which will be verifying the session)
let verifySession = (req,res,next) =>{
    // grab the refresh token from the headers
    let refreshToken = req.header('x-refresh-token');

    // grab the id from the req header
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if(!user){
            // user couldn't be found
            return Promise.reject({
                "error": "User not found!!. Make sure the refresh token and id are valid!!"
            })
        }

        // if user was found so therefore the session is valid

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;
        let is_session_valid = false;
        
        user.sessions.forEach((session) => {
            if(session.token === refreshToken){
                // check if the session has expired
                if(User.hasRefreshTokenExpired(session.expiresAt) === false){
                    // refresh token has not expired
                    is_session_valid = true;
                }
            }
        });

        if(is_session_valid){
            next();
        }else{
            // the session is not valid
            return Promise.reject({
                "error": "Refresh token has expired! or the session is invalid!!"
            })
        }
    }).catch((e) => {
        res.status(401).send(e);
    })
}

/**
 * GET /api/contacts
 * Purpose Get all the contacts
 */

app.get('/api/contacts', (req,res) => {
    ContactDetails.find({}).then((contactDetails) => {
        res.send(contactDetails);
    }).catch((e) => {
        res.send(e);
    })
})

/**
 * POST /api/contacts
 * Purpose: Create a new contact
 */

 app.post('/api/contacts', (req,res) => {
     const newContact = new ContactDetails({
         name: req.body.name,
         dob: req.body.dob,
         phoneNumbers: req.body.phoneNumbers,
         emails: req.body.emails
     })

     newContact.save().then((newContactDetails) => {
         res.send(newContactDetails);
     }).catch((e) => {
         res.send(e);
     })
 })

/**
 * GET /api/contacts/:contactName
 * Purpose: Search particular contact
 */
app.get('/api/find/contacts/:contactName', (req,res) => {
    // let regex = new RegExp(req.par.name,'i');
    
    ContactDetails.find({
        "name": { "$regex": "^" + req.params.contactName, "$options": "i" }
    }).then((newUpdatedContact) => {
       res.send(newUpdatedContact);
    }).catch((e) => {
        res.send(e);
    })
})

/**
 * GET /api/contacts/:contactId
 * Purpose: Get particular contact
 */

app.get('/api/contacts/:contactId', (req,res) => {
    ContactDetails.find({
       _id : req.params.contactId
    }).then((newUpdatedContact) => {
       res.send(newUpdatedContact);
    }).catch((e) => {
        res.send(e);
    })
})
/**
 * PATCH /api/contacts/:contactId
 * Purpose: Edit / update particular contact
 */

 app.patch('/api/contacts/:contactId', (req,res) => {
     ContactDetails.findOneAndUpdate({
        _id : req.params.contactId
     },{
         $set : req.body
     }).then((newUpdatedContact) => {
        res.send(newUpdatedContact);
     }).catch((e) => {
         res.send(e);
     })
 })

/**
 * DELETE /api/contacts/:contactId
 * Purpose: DELETE particular contact
 */

app.delete('/api/contacts/:contactId',(req,res) => {
    ContactDetails.findOneAndRemove({
        _id : req.params.contactId
     }).then((newUpdatedContact) => {
        res.send(newUpdatedContact);
     }).catch((e) => {
         res.send(e);
     })
})

/* USER ROUTES */

/**
 * POST /users
 * PURPOSE : Sign Up
 */

app.post('/users', (req,res) => {
    // User sign up

    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken required
        // now we generate access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {

            // now we have both the tokens generated return them
            return {accessToken, refreshToken};
        })

    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body

        res.header('x-refresh-token', authTokens.refreshToken).header('x-access-token', authTokens.accessToken).send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

/**
 * POST /users/login
 * PURPOSE : Login
 */

app.post('/users/login', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email,password).then((user) => {
        return user.createSession().then((refreshToken) => {
            //Session created successfully - refreshToken returned
            // now we generate an access token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                return {accessToken, refreshToken};
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body

            res.header('x-refresh-token', authTokens.refreshToken).header('x-access-token', authTokens. accessToken).send(user);          
        })
    }).catch((e) => {
        res.status(400).send(e);
    })
})

/**
 * GET users/me/access-token
 * Purpose: generates and return access token
 */

 app.get('/users/me/access-token' , verifySession, (req,res) => {
    // we know the user caller is authenticated and we have the user id available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({accessToken});
    }).catch((e) => {
        res.status(400).send(e);
    })

 })

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})