studentService=require('../services/studentserves');
router = require('express').Router();

const uuidv1 = require('uuid/v1');

module.exports = router;

router.post('/', onlyemailcheck)

function onlyemailcheck(req, res, next) {
    console.log('--------------------->kk')
    console.log('--------------------->inside contro', req.body)
    var postdata= req.body
    var token = uuidv1();
    console.log(token)
    postdata['token'] = token;
    studentService.getforgetstudents(postdata).then((result)=>{
        console.log('/////////////',result)
    res.status(200).send({data:result})   
    }).catch((error)=>{
    res.status(200).send({data:error})
})
}