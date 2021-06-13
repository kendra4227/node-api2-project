const express = require('express');
const Post = require('./posts-model')
const router = express.Router();

router.get('/',(req,res)=>{
    Post.find()
    .then(found =>{
        res.json(found)

    })
    .catch(err=>{
        res.status(500).json({
            message:"The post information could not be received",
            err:err.message,
            stack:err.stack,

        })
    })

})
router.get('/:id',async(req,res)=>{
    const{id} =req.params;
    try{
        const post = await Posts.findById(id);
        if (!post) {
          res
            .status(404)
            .json({ message: `The post with id ${id} does not exist` });
        } else {
          res.json(post);
    }
}
    catch(err){
        res.status(500).json({
            message:"The post with the specific ID does not exist",
            err:err.message,
            stack:err.stack,

        })
    }
    
})
router.post('/',async(req,res)=>{
    const post = req.body;

    try {
      if (!post.title || !post.contents) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
      } else {
        const getId = await Posts.insert(post);
        const newPost = await Posts.findById(getId);
        res.status(201).json(newPost);
      }
    } catch (err) {
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    }
   
})
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await Posts.findById(id);
      if (!deleted) {
        res
          .status(404)
          .json({ message: `The post with id ${id} does not exist` });
      } else {
        const deletedPost = await Posts.findById(id);
      res.status(200).json(deletedPost);
      await Posts.remove(id);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "The post could not be removed" });
    }
  });
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const post = req.body;
  
    try {
      if (!post.title || !post.contents) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
      } else {
        const updatedPost = await db.update(id, post);
        if (!updatedPost) {
          res
            .status(404)
            .json({ message: `The post with id ${id} does not exist` });
        } else {
            const postUpdated = await Posts.findById(id);
        res.status(200).json(postUpdated);
        }
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "The post information could not be modified" });
    }
  });
  router.get("/:postID/comments", async (req, res) => {
    const { postID } = req.params;
  
    try {
      const getPostID = await Posts.findById(postID);
      if (!getPostID) {
        res
          .status(404)
          .json({ message: `The post with id ${postID} does not exist` });
      } else {
        const comments = await Posts.findPostComments(postID);
        res.json(comments);
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "The comments information could not be retrieved" });
    }
  });
  











module.exports = router;