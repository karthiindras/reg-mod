const express=require('express');
const cors = require('cors');
const mysql=require('mysql');
var jwt = require('jsonwebtoken');
// lkjhgfds
const app=express();
const port=4009;

const db= mysql.createConnection(
    {
        
        host:'localhost',
        user: 'karthi',
        password: 'password',
        database:'nuxtstudent'

    }
);
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('connected to database');
});
global.db= db;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/register',require('./controller/registerController'))
app.use('/tokenbackend',require('./controller/tokenbackendcontroller'))
app.use('/login_register',require('./controller/loginregistercontroller'))
app.use('/forget_register',require('./controller/forgetcontroller'))
app.use('/forget_new_password',require('./controller/newpasswordcontroller'))


app.use(authen)
app.use('/welcome_controller',require('./controller/welcomecontroller'))

function authen (req,res,next) {
    console.log('hllo word', req.headers)
    console.log('mnkjkkkkkkkkk', req.headers.authendication)
    jwt.verify(req.headers.authendication, 'authendication', function(err, decoded) {
        if(err) {
            console.log('user cannot allowed the this page')
        }
        else {
            next();
        }
    })

}
// app.use('/login',require('./controller/loginController')) 
// app.use('/logout',require('./controller/logoutController'))         
app.listen(port,() => console.log('Server Started ' + port+' !'))