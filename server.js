const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '5mb' }));
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
});

const autoReplyTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
});


//Contact-Us Page --- JEF

app.post('/get-in-touch-jef', async (req, res) => {
  const contactformData = req.body;
  console.log('Form Data:', contactformData);

  const {
    firstname,
    lastname,
    email,
    phone,
    company,
    query,
    marketing,
  } = contactformData;

  const contactForm = {
    from: 'marketingjefuae@gmail.com',
    to: 'marketingjefuae@gmail.com',
    subject: 'Hello Jef you have a Lead to get in touch !! Hurry',
    html: `
        <p>Hi JEF</p>
        <p>You have a new message from the contact form. Here are the details:</p>
        <p><strong>Name:</strong> ${firstname} ${lastname}<br>
        <strong>Email:</strong> ${email} <br>
        <strong>Phone Number:</strong> ${phone} <br>
        <strong>Company Name:</strong> ${company} <br>
        <strong>Message Details:</strong> ${query} </p>
        <strong>Marketing Permissions:</strong> ${marketing} <br>
        <p>Please review this message and respond as soon as possible.</p>
        <p>Best,</p>
        <p>JEF AI</p>
        <p>YOUR SALES BACKBONE</p>
      `,
  };


  const autoReplycontactForm = {
    from: 'marketingjefuae@gmail.com',
    to: email,
    subject: 'JEF UAE IS READY TO GET IN TOUCH SHORTLY !',
    html: `
        <p>HI ${firstname},</p>
        <p>Thank you for contacting us! We’ve received your details and our team will get back to you shortly. Here’s a summary of your submission:</p>
        <p>We’ll do our best to respond within 1-2 business days. In the meantime, feel free to browse our website for more information.</p>
        <p>Best regards, <br>
        JEF UAE Team <br>
        JEF TECHNO SOLUTIONS PRIVATE LIMITED
        </p>
      `,
  };

  transporter.sendMail(contactForm, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent to JEF:', info.response);

      autoReplyTransporter.sendMail(autoReplycontactForm, (autoReplyError, autoReplyInfo) => {
        if (autoReplyError) {
          console.error('Error sending auto-reply email:', autoReplyError);
        } else {
          console.log('Auto-reply sent to user:', autoReplyInfo.response);
        }
      });
      res.status(200).json({ message: 'Form submission successful!' });
    }
  });
});


//Contact-us Form --- JEF

app.post('/contact-us-jef', async (req, res) => {
  const ReachUs = req.body;
  console.log('Form Data:', ReachUs);

  const {
    name,
    email,
    phoneNumber
  } = ReachUs;


  const reachUs = {
    from: 'marketingjefuae@gmail.com',
    to: 'marketingjefuae@gmail.com',
    subject: 'Hello Jef you have a Lead to get in touch !! Hurry',
    html: `
        <p>Hi JEF</p>
        <p>You have a new message from the contact form. Here are the details:</p>
        <p><strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email} <br>
        <strong>Phone Number:</strong> ${phoneNumber} <br>
        <p>Call up the client, Its urgent need you attention.</p>
        <p>Best, </p>
        <p>JEF AI</p>
        <p>YOUR SALES BACKBONE</p>
      `,
  };

  const autoReplyreachUs = {
    from: 'marketingjefuae@gmail.com',
    to: email,
    subject: 'JEF UAE IS READY TO GET IN TOUCH SHORTLY !',
    html: `
        <p>Hi ${name},</p>
        <p>We’ll do our best to respond within 1-2 business days. In the meantime, feel free to browse our website for more information.</p>
        <p>Best regards, <br>
        JEF UAE Team  <br>
        JEF TECHNO SOLUTIONS PRIVATE LIMITED
        </p>
      `,
  };

  transporter.sendMail(reachUs, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent to JEF:', info.response);

      autoReplyTransporter.sendMail(autoReplyreachUs, (autoReplyError, autoReplyInfo) => {
        if (autoReplyError) {
          console.error('Error sending auto-reply email:', autoReplyError);
        } else {
          console.log('Auto-reply sent to user:', autoReplyInfo.response);
        }
      });
      res.status(200).json({ message: 'Form submission successful!' });
    }
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
