const express = require('express');
const usersdb = require("./userDb")
const postsdb = require("../posts/postDb")
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
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

router.get('/api/users/:id/posts', (req, res) => {
  // do your magic!
  postsdb.getById(req.params.Id)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    console.log((error) =>{
      res.status(500).json({
        message: "Error retrieving post"
      })
    })
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  usersdb.remove(req.params.id)
    .then(() => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been deleted",
        })
      } else {
        res.status(404).json({
          messgae: "Error removing the user",
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error removing the user"
      })
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  return(req,res,next) => {
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
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          message: "Error retrieving the user"
        })
      })
  }
}

function validateUser(req, res, next) {
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

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body.post) {
    return res.status(400).json({
      message: "Missing user's post",
    })
  }
}

module.exports = router;
