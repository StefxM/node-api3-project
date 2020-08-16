const express = require('express');
const usersdb = require("./userDb");
const postdb = require("../posts/postDb");


const router = express.Router();
//all good
router.post('/api/users',validateUser(), (req, res) => {
  // do your magic!
  usersdb.insert(req.body) 
    .then((users) => {
      res.status(201).json(users)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error adding the user",
      })
    })
  
});
//STUCKKKK
router.post('/api/users/:id/posts',validateUserId(),validatePost(), (req, res) => {
  // do your magic!
  // if(!req.body.text) {
  //   return res.status(400).json({
  //     message: "Need a value for text"
  //   })
  // }
    postdb.insert({...req.body, user_id:req.params.id,  })
    .then((post) => {
      res.status(201).json(post)
    })
    .catch(error => console.log(error))
  });

//good
router.get('/api/users', (req, res) => {
  // do your magic!
  
  usersdb.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the users",
      })
    })

});
//all good
router.get('/api/users/:id', (req, res) => {
  // do your magic!
  
  usersdb.getById(req.params.id)
    .then((users)=> {
      res.status(200).json(users)
    })
    .catch((error) =>{
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the user",
      })
    })
});
//works
router.get('/api/users/:id/posts', (req, res) => {
  // do your magic!
  usersdb.getUserPosts(req.params.id)
    .then((posts) => {
      if (posts) {
        res.json(posts)
      } else {
        res.status(404).json({
          message: "Cant retrieve post"
        })
      }
    })
    .catch(error => console.log(error))
});
//works 
router.delete('/api/users/:id',validateUserId(), (req, res) => {
  // do your magic!
  usersdb.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been deleted",
        })
      } else {
        res.status(404).json({
          message: "Error removing the user",
        })
      }
    })
    .catch(error => console.log(error))
});
//FIXED
router.put('/api/users/:id',validateUserId(), (req, res) => {
  // do your magic!
  usersdb.update(req.params.id, req.body)
  .then((users) => {
    if (users) {
      res.status(200).json(users)
    } else {
      res.status(404).json({
        message :"post does not exist"
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "the post info could not post"
    })
  })
});

//custom middleware

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
    usersdb.getById(req.params.id)
      .then((user)=>{
        if(user) {
          req.user=user
          next()
        } else {
          res.status(404).json({
            message: "User not found"
          })
        }
      })
      .catch(next)
    }
}

function validateUser() {
  // do your magic!
  return(req,res,next) => {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Missing user",
      })
    }
    next()
  }
}

function validatePost() {
  // do your magic!
  return (req,res,next) => {
  if(!req.body.text) {
    return res.status(400).json({
      message: "Missing user's post",
    })
  }
  next()
}
}

module.exports = router;
