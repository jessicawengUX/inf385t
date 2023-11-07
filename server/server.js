const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5050;
app.use(cors({}));
app.use(express.json());
app.use(require("./routes/routes")); 

// get driver connection
const dbo = require("./database/conn");

app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer();
    console.log(`Server is running on port: ${port}`);
});



//sending email from contact form
const nodemailer=require('nodemailer');
const appRouter = require("./routes/routes");
let transporter = nodemailer.createTransport({
   service:'gmail',
   auth:{
    user:'jessica.ts.weng@gmail.com',
    pass:'uenrocernzqhyveg'
   } 
});

