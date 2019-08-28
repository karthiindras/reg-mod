studentService=require('../services/studentserves');
router = require('express').Router();

const uuidv1 = require('uuid/v1');

module.exports = router;

router.post('/', Insertstudents)

function Insertstudents(req, res, next) {
    console.log('inside contro')
    var postdata= req.body
    var token = uuidv1();
    console.log(token)
    postdata['token'] = token;

    studentService.insertAllstudents(postdata).then((result)=>{
    res.status(200).send({data:result})   
    }).catch((error)=>{
    res.status(200).send({data:error})
})
}