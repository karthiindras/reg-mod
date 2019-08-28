studentService=require('../services/studentserves');
// const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
router = require('express').Router();
module.exports = router;
// router.get('/', getAllstudents);
// router.get('/:id',getstudentsByid) 
router.post('/', Insertstudents)
// router.put('/:id', Updatestudents)
// router.delete('/:id', Deletestudents) 

// async function getAllstudents(req, res, next) {
//     studentService.getAllstudents().then((result)=>{
//         console.log(result)
//         res.status(200).send({data:result})
//     })
// }

// async function getstudentsByid(req,res,next){
//     studentService.getstudentsByid(req.params['id']).then((result)=>{
//         console.log(result)
//         res.status(200).send({data:result})
//     })
// }

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

// function Updatestudents(req, res, next) {

//     var postdata= req.body
//     studentService.uppdateAllstudents(postdata,req.params['id']).then((result)=>{
//         res.status(200).send({data:result})


// })
// }

// function Deletestudents(req, res, next) {
//     studentService.deleteAllstudents(req.params['id']).then((result)=>{
//         console.log(result)
//         res.status(200).send({data:result})


// })
// }