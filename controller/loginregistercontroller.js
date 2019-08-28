studentService=require('../services/studentserves');
router = require('express').Router();


module.exports = router;

router.post('/', loginstudents)

function loginstudents(req, res, next) {
    console.log('--------------------->kk')
    console.log('--------------------->inside contro')
    var postdata= req.body
    studentService.getloginstudents(postdata).then((result)=>{
        console.log('/.,/.,,', result)
    res.status(200).send({data: result})   
    }).catch((error)=>{
    res.status(200).send({data:error})
})
}