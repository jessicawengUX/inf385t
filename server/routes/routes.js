const express = require("express");
const path = require('path');
const session = require('express-session');
const nodemailer=require('nodemailer');

// The router will be added as a middleware and will take control of requests starting with path /record.
const appRouter = express.Router();

appRouter.use(session({
   secret: "Your secret key",
   resave: false,
   saveUninitialized: false
}));

//var session;

const dbo = require("../database/conn");

// Serve static files from the "public" directory

appRouter.route('/').get(function (req, res) {
  if (req.session.user) {
    res.redirect('/app');
  } else {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index_home.html'));
  }
});

// Serve static files from the "public" directory
// MAKE SURE THIS GOES UNDER THE '/' ROUTE
appRouter.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')));

appRouter.use('/app', express.static(path.join(__dirname, '..', '..', 'client', 'build')));

appRouter.get('/app/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

// This section will help you get a list of all the records.
//appRouter.route("/products").get(async function (req, res) {
//    let db_connect = dbo.getDb("eCommerce");
//    const productList = await db_connect.collection("products").find().toArray();
//console.log(productList);
//    res.json(productList);

//});

// Route for user to register.

appRouter.route("/register").post(function (req, response) {
   let db_connect = dbo.getDb();
   let newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      address: req.body.address,
   };

   db_connect.collection("customers").insertOne(newUser, function (err, res) {
      if (err) throw err;
      response.json(res);
   });
});

// Route for user to login.
appRouter.route("/login").post(async function (req, response) {
   let db_connect = dbo.getDb();
   let loginCredentials = {
      email: req.body.email,
      password: req.body.password,
   };
   console.log(loginCredentials);

   var email = {
      email: loginCredentials.email
   };
   const results = await db_connect.collection("customers").find(email, {
      _id: 0,
      "password": 1
   }).toArray();
   const db_password = results[0].password;
   console.log(db_password);
   if (db_password == loginCredentials.password) {
      req.session.user = loginCredentials.email;
      response.send("logged in!");
   } else {
      response.send("email or/and password is incorrect!");
   }

});

//sending email from contact form
appRouter.post('/send-email', (req, res) => {
   let transporter = nodemailer.createTransport({
     service:'gmail',
     auth:{
      user:'jessica.ts.weng@gmail.com',
      pass:'uenrocernzqhyveg'
     } 
   });


   let mailOptions = {
     from: req.body.email,
     to: 'jessica.ts.weng@gmail.com',
     subject: `New Contact Message from ${req.body.name} | Ammo Forecast Tool`,
     text: `Name: ${req.body.name}\n\nEmail: ${req.body.message}\n\nMessage: ${req.body.message}`
   };

   transporter.sendMail(mailOptions, (error, info) => {
     if (error) {
       res.status(500).send({ error: "Error occurred while trying to send email" });
     } else {
       res.send({ success: "Email sent successfully" });
     }
   });
});
  

module.exports = appRouter;