studentService=require('../services/studentserves');
router = require('express').Router();


module.exports = router;


router.post('/', getstudents)

function getstudents(req, res, next) {
    console.log('vandhuta')
    console.log('inside contro')
    var postdata= req.body
    studentService.getAllstudents(postdata).then((result)=>{
    res.status(200).send({data:result})   
    }).catch((error)=>{
    res.status(200).send({data:error})
})
}