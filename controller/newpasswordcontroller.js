studentService=require('../services/studentserves');
router = require('express').Router();


module.exports = router;

router.post('/', newpassword)

function newpassword(req, res, next) {
    console.log('--------------------->kk')
    console.log('--------------------->inside contro')
    console.log('req body',req.body)
    var postdata= req.body
    studentService.newloginstudents(postdata).then((result)=>{
    res.status(200).send({data:result})   
    }).catch((error)=>{
    res.status(200).send({data:error})
})
}