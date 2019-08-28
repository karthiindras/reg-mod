studentService=require('../services/studentserves');
router = require('express').Router();


module.exports = router;

router.post('/:hello', welcomestudents)

function welcomestudents(req, res, next) {
    // studentService.getwelcomestudents(req.headers.authendication).then((result)=>{
    // console.log('/.,/.,,', result)
    // res.status(200).send({data:result})   
    // }).catch((error)=>{
    // res.status(200).send({data:error})
    res.status(200).send({msg: 'Welcome My page'})
    console.log('Welcome Page')
}