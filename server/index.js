//Dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const posts = require('./routes/api/posts.js');

//Configuration
const port = process.env.PORT || 5000;

//App object
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Main app
app.use('/api/posts',posts);

//Starting server
app.listen(port,()=>{
  console.log(`server running at ${port}`);
});