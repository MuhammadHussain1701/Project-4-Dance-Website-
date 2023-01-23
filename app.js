const express = require("express");
const path = require("path"); 
const app = express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
// mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});
mongoose.connect('mongodb://localhost/contactDance',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})
const port = 8000;

// define Mongoose Schema

var contactSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
});
var contact=mongoose.model('Contact',contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{ 
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved in the database");
    }).then(()=>{
        res.status(400).send("this item has not been saved in database")
    })
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});