const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  host:process.env.Host,
  service:"gmail",// e.g., 'Gmail', 'Outlook', etc.
  auth: {
    user: process.env.email,
    pass: process.env.password
  },
  
});


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

app.post('/submit', (req, res) => {
    const mailOptions = {
      from: process.env.email,
      to: req.body.email,
      subject:"your confirmation ticket",
      text:"you sucessfully book your slot ",
    };
  
    transporter.sendMail(mailOptions, (error,info) => {
      if (error) {
        console.log(error);
      }else{
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
      }
        
      
    });
  });
  

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
