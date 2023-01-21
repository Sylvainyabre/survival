

const express = require('express');
const router = express.Router();
const passport  = require('passport')
// const checkPermission = require('../middleware/auth')

//Home page   Login/homepage
//@route   GET /

router.get('/',  (req, res) => {
 res.send("Hello!")
});


// Dashboard
//@route  GETb/dashboard

router.get('/dashboard',
(req,res) =>{
    res.send("Dashboard")
})


module.exports = router;