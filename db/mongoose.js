// This will handle connection logic of mongoose

const mongoose = require('mongoose');

// using global javascript promise functionality in mongoose promises
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/phone-book", { useNewUrlParser : true}).then(()=>{
    console.log("Connected to MongoDb Successfully!!");
}).catch((err)=>{
    console.log(err);
})

// to prevent some deprecation warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
}
