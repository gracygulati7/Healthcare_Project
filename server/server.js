// framework configuration
const express = require("express");
const connectDb = require("./config/dbConnection");

const errorHandler = require("./Middleware/errorHandler");
// Errorhandler is a middleware function that catches errors that are thrown in the application and logs them to the console.

const cors = require("cors"); // cors for security at server side
// CORS - Cross-Origin Resource Sharing.
// It is a security feature implemented by browsers to prevent malicious websites from making requests to your server.

connectDb(); // db connection setup for crud operations
const app = express();

// process.env.PORT is used to get the port number from the environment variable PORT
// If the environment variable PORT is not set, then the port number is set to 5000
// either file is frontend or backend pass all configurations through env file only.
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// error handler middleware
app.use(errorHandler);

// routes below
app.get("/", (req, res) => {
    res.send("Working");
});

// app config start
app.listen(port,()=> {
    console.log(`Server is running on port http://localhost:${port}`);
});

