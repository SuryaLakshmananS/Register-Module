const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const cors = require('cors'); // Import cors

const app = express();
const PORT = 3500;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Connect to MongoDB (Make sure MongoDB is running)
mongoose.connect('mongodb://127.0.0.1/user-db', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  isActive: { type: Boolean, default: false },
});
const UserModel = mongoose.model('User', userSchema);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Express routes
app.post('/register', async (req, res) => {
  const { name, email, phone } = req.body;

  // Check if the user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create a new user
  const newUser = new UserModel({ name, email, phone });
  await newUser.save();

  // Send verification email
  const activationLink = `http://localhost:${PORT}/activate/${newUser._id}`;
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Account Activation',
    html: `Click <a href="${activationLink}">here</a> to activate your account.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });

  res.json({ message: 'Registration successful. Please check your email for activation link.' });
});

app.get('/activate/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await UserModel.findById(userId);

  if (user) {
    user.isActive = true;
    await user.save();
    res.send('Account activated successfully.');
  } else {
    res.status(404).send('User not found.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
