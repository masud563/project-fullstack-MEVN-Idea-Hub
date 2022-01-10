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
app.use('/api/posts/',posts);

//Handle production
if(process.env.NODE_ENV === 'production'){
  //Static folder
  app.use(express.static(__dirname +'/public/'));

  //Handle SPA
  app.get(/.*/,(req,res)=> res.sendFile(__dirname + '/public/index.html'));
}
//Starting server
app.listen(port,()=>{
  console.log(`server running at ${port}`);
});