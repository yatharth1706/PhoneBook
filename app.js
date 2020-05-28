const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');

// database connectivity code
const {mongoose} = require('./db/mongoose')
// contact Details model code
const { ContactDetails } = require('./db/models');

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

/**
 * GET /
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
 * POST /contacts
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
 * GET /contacts/:contactId
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
 * PATCH /contacts/:contactId
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
 * PATCH /contacts/:contactId
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

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})