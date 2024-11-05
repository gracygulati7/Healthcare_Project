// // framework configuration
// const express = require("express");
// const connectDb = require("./Config/dbConnection");

// const errorHandler = require("./Middleware/errorHandler");
// // Errorhandler is a middleware function that catches errors that are thrown in the application and logs them to the console.
// // Middleware functions are functions that have access to the request object (req), the response object (res), 
// // and the next function in the application’s request-response cycle.

// const cors = require("cors"); // cors for security at server side
// // CORS - Cross-Origin Resource Sharing.
// // It is a security feature implemented by browsers to prevent malicious websites from making requests to your server.

// const app = express();

// // env file config
// const dotenv = require("dotenv");
// dotenv.config();
// // we install dotenv package to use environment variables in our application.

// connectDb(); // db connection setup for crud operations

// // process.env.PORT is used to get the port number ,from the environment variable PORT
// // If the environment variable PORT is not set, then the port number is set to 5000
// // either file is frontend or backend pass all configurations through env file only.
// const port = process.env.PORT || 5000;

// var hbs=require('hbs');
// hbs.registerPartials(__dirname+'/views/partials',function(err){});
// app.set('view engine','hbs');


// app.use(express.json());
// app.use(cors());
// // error handler middleware
// app.use(errorHandler);

// // routes below
// app.get("/", (req, res) => {
//     res.send("Working");
// });

// app.get("/home",(req,res)=>{
//     // let user = User.findOne({id:})
//     res.render("home",{
//         username:"Gracy",
//         posts:"bla bla bla"
//     })
// });
// app.get("/allusers",(req,res)=>{
//     const users=[
//         {username:"Gracy",age:20},
//         {username:"Sorabh",age:23},
//         {username:"Buddy",age:25}

//     ];
//     res.render("allusers",{
//        users:users
//     });
// });

// // Route for user registration and authetication
// app.use("/api/",require("./Routes/userRoutes"));
// app.use("/api/details",require("./Routes/doctorDetails"));

// // app config start
// app.listen(port,()=> {
//     console.log(`Server is running on port http://localhost:${port}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./Config/dbConnection");
const errorHandler = require("./Middleware/errorHandler");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const multer = require('multer');
const File = require('./Models/file'); // Import the File model

dotenv.config();
connectDb(); // Connect to the database

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configure Multer storage with unique filenames
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const upload = multer({ storage: storage });

// Home route to render the page
app.get("/home", async (req, res) => {
    // Fetch all uploaded files from MongoDB
    const files = await File.find();
    res.render("home", {
        username: "Hiya",
        users: [{ name: "John Doe", age: 30 }, { name: "Jane Smith", age: 25 }],
        files: files // Pass files to the template
    });
});

// Route to handle file upload and save metadata in MongoDB
app.post('/profile', upload.single('avatar'), async (req, res) => {
    try {
        // Create a new file record in MongoDB
        const fileData = new File({
            originalName: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
        });

        await fileData.save(); // Save metadata to MongoDB
        console.log("File metadata saved:", fileData);

        return res.redirect("/home");
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file.");
    }
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});