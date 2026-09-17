const express = require('express'); // importing the express module of packages, etc
const mongoose = require('mongoose'); // same  importing mongodb related 
const bodyParser = require('body-parser'); // which data format related db

const app = express(); // implementating the server
app.use(bodyParser.json()); //using the data infor in json

// Connect to local MongoDB Compass instance
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/crt';
// here db name is aiml_d, you can change it to your database name
mongoose.connect(url)
  .then(() => {
    const userRoutes = require('./route/userroute');  
    app.use('/users', userRoutes);

    app.listen(3000, () => console.log('Server is running on port 3000'));
  })
  .catch((err) => {
    console.error("connection failed :: ", err);
    process.exit(1);
  });

  