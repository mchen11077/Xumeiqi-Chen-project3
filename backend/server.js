const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const path = require('path');
require('dotenv').config();

// Define MongoDB endpoint
const mongoDBEndpoint = "mongodb+srv://1332134662:banana1234@cluster0.f4tgrmc.mongodb.net/";

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files from the frontent 'dist' directory
let frontend_dir = path.join(__dirname, '..', 'frontend', 'dist')
app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});

app.use('/api/authorization', require('./api/authorization'));
app.use('/api/passwords', require('./api/password'));

// Database connection
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(err => {
    console.error('Error connecting to database:', err.message);
    process.exit(1);
  });

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

