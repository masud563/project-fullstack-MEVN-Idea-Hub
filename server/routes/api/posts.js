//Dependencies
const express = require('express');
const mongodb = require('mongodb');

//Mini app
const router = express.Router();

//Get post
router.get('/',async (req,res)=>{
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//Add post
router.post('/',async (req, res)=>{
  try{
    const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
  }catch(err){
    console.log(err.message);
  }
} );
//Delete post
router.delete('/:id', async (req,res)=>{
  try{
    const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
  }catch(err){
    console.log(err.message);
  }
})

const loadPostsCollection = async ()=>{
  const client = await mongodb.MongoClient.connect('mongodb+srv://masud:masud@cluster0.ge91c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true
  });

  return client.db('vue').collection('posts');
}
module.exports = router;