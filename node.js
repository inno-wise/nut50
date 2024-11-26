const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (optional for hosting the form)
app.use(express.static('public'));

// Route to handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use your email service provider
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password', // use an app password for Gmail
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'your-email@example.com', // replace with your email
    subject: 'Contact Form Submission',
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully!');
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});