// framework configuration
const express = require("express");
const connectDb = require("./Config/dbConnection");

const errorHandler = require("./Middleware/errorHandler");
// Errorhandler is a middleware function that catches errors that are thrown in the application and logs them to the console.
// Middleware functions are functions that have access to the request object (req), the response object (res), 
// and the next function in the application’s request-response cycle.

const cors = require("cors"); // cors for security at server side
// CORS - Cross-Origin Resource Sharing.
// It is a security feature implemented by browsers to prevent malicious websites from making requests to your server.

// env file config
const dotenv = require("dotenv");
dotenv.config();
// we install dotenv package to use environment variables in our application.

connectDb(); // db connection setup for crud operations
const app = express();

// process.env.PORT is used to get the port number from the environment variable PORT
// If the environment variable PORT is not set, then the port number is set to 5000
// either file is frontend or backend pass all configurations through env file only.
const port = process.env.PORT || 5000;

// const path = require('path');
// const hbs = require('hbs'); 

// // Set the views directory
// app.set('views', path.join(__dirname, 'views'));

// // Register the partials directory for hbs
// hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(express.json());
app.use(cors());
// error handler middleware
app.use(errorHandler);

// routes below
app.get("/", (req, res) => {
    res.send("Working");
});
app.get("/home",(req,res)=>{
    // let user = User.findOne({id:})
    res.render("home",{})
});
app.get("/allusers",(req,res)=>{
    res.render("users",{
        users:[{id:1,username:"Gracy", age:20},
            {id:1,username:"Sorabh", age:23}
        ]
    })
})


// app config start
app.listen(port,()=> {
    console.log(`Server is running on port http://localhost:${port}`);
});

app.set('view engine','hbs');
