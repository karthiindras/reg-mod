const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer")
var jwt = require('jsonwebtoken');
// import VueSession from 'vue-session'
// Vue.use(VueSession, {persist: true})
// const uuidv1 = require('uuid/v1');

// const app1=uuidv1();
module.exports = {
  // getAllstudents,
  // getstudentsByid,
  insertAllstudents,
  getAllstudents,
  getloginstudents,
  getforgetstudents,
  newloginstudents,
  getwelcomestudents
  // uppdateAllstudents,
  // deleteAllstudents
};

//  function getAllstudents() {

//   console.log('db test');
//   return new Promise((resolve, reject) => {

//     query = 'select * from regform';


//     db.query(query, (err, result, field) => {

//       console.log('db test', result, query);

//       if (err)
//         reject(err);
//       console.log('filelds', field);
//       resolve('Registered Success')

//     })
//     resolve("Registered Success")
//   })
// }

// function getstudentsByid(id) {
//   console.log('db test');
//   return new Promise((resolve, reject) => {

//     query = 'select * from student where id = ' + id;

//     db.query(query, (err, result, field) => {

//       // console.log('db test', result, query);

//       if (err)
//         reject(err);
//       // console.log('filelds', field);
//       resolve(result)

//     })
//   })

// }

function insertAllstudents(postdata) {
  // console.log('db test -- >', postdata, '<--');
  // let pass=postdata.email;nuxtstudent.student
  return new Promise((resolve, reject) => {
    let hash = bcrypt.hashSync(postdata.password, 10);
    console.log('vandhuta')
    console.log('ok')
    query = 'insert into regform(name, email, password, token ) values ("' + postdata.name + '","' + postdata.email + '","' + hash + '","' + postdata.token + '")';
    console.log(postdata.hash)

    db.query(query, (err, result, field) => {
      console.log('db test', result, query);
      if (err)
        reject("user already exists");
      // console.log('filelds', field);
      resolve("Registered Success")
    })

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'karthi.indras@gmail.com ',
        pass: 'IndrasSiva'
      }
    });

    var mailOptions = {
      from: 'karthi.indras@gmail.com',
      to: postdata.email,
      subject: postdata.token,
      html: '<a href="http://localhost:3000/verifyemail/ ' + postdata.token + '">click pannu da (or) di</a>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
    // sendmail (req,res,next) {

    // }
  })
}




function getAllstudents(postdata) {

  console.log('vary---------------------->', postdata.active);
  //   return postdata.data;
  return new Promise((resolve, reject) => {
    let token1 = postdata.active.trim();
    query = 'select * from regform where token= "' + token1 + '" ';


    db.query(query, (err, result, field) => {
      console.log('okoko', result)

      console.log('kokokojjijji', result[0].isactive);
      if (result[0].isactive === 0) {
        let token1 = postdata.active.trim();
        query = 'UPDATE regform SET isactive = ' + true + ' WHERE token = "' + token1 + '" '

        db.query(query, (err, result, field) => {
          console.log('result', result)
          if (result)
            console.log('check')
          resolve('kk successfull')
          reject('kk not successfull')

        })
      } else {
        reject('Already Activated')
      }
      //  db.query(query1, (err, result ,field) => {
      //   console.log('err or result')
      //   console.log('error',err)
      //   console.log('result',result)
      //   if(err) {
      //     reject (err) 
      //     resolve (result)
      //   }
      // } )
    })
  })
}


function getloginstudents(postdata) {
  return new Promise((resolve, reject) => {
    console.log('email')
    // let hash = bcrypt.hashSync(postdata.password, 10);
    console.log('vandhuta')
    console.log('ok')
    console.log('email checking', postdata.email)
    let stude_email = postdata.email;
    query = 'select * from regform where email= "' + stude_email + '"';
    
    console.log('---------------->', query)
    db.query(query, (err, result, field) => {

      if ( result.length == 0) {
        reject ({data:'login faild'})
      } else {
      var token = jwt.sign({ emailid: result[0].email }, 'authendication');

        console.log('database empty', result)
      console.log('', result[0].password)
      if (result[0].isactive == 1) {
        bcrypt.compare(postdata.password, result[0].password, function (err, res) {
          if (res) {
            if (postdata.email == result[0].email) {
              console.log('login successfull',token)
              console.log('77890907456784653593887', token)
              console.log('authendicationtoken',token)
              resolve({data:'login successfull',token})
              // resolve('authendicationtoken','token')
              reject({data:'login faild'})
            } else {
              console.log('login faild')
              reject ({data:'login faild'})
            }
          } else {
            console.log('login failed')
            reject ({data:'login faild'})
          }

        })
      } else {
        console.log('Please fill the registration form')
        reject({data:'Please click the email link'})
      }
      }
    })
    
  })
}


function getforgetstudents (postdata) {
  console.log('=========================>',postdata)
  return new Promise((resolve, reject) => {

    query = 'select * from regform where email= "' + postdata.email + '"';
    db.query(query, (err, result, field) => {
      console.log('result',result)
      if ( result.length == 0) {
        reject ('sry please currect email')
      } else {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'karthi.indras@gmail.com ',
            pass: 'IndrasSiva'
          }
        });
    
        var mailOptions = {
          from: 'karthi.indras@gmail.com',
          to: postdata.email,
          subject: postdata.token,
          html: '<a href="http://localhost:3000/veryfyforgetpassword/ ' + postdata.token + '">click pannu da (or) di</a>'
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log(info);
          }
        });
          query = 'UPDATE regform SET forgettoken="'+postdata.token+'" where email='+"'"+ result[0].email+"'";
          db.query(query, (err, res, field ) => {
            if (err) 
              reject('please enter the currect email')
            resolve('currect email')
          })
        } 
    })    

  
  })
}



function newloginstudents (postdata) {
  return new Promise((resolve, reject) => {
    let token1 = postdata.token.trim();
    console.log(';;;;;;;;;',postdata)
    console.log('ooooooooooooo',token1)
    bcrypt.hash(postdata.password,10, function (err, hash) {
      query = 'select * from regform where  forgettoken ='+ "'"+token1+"'";
      db.query(query, (err, result, field) => {
        console.log(',,,,,,,,,,,,,,,,,',result)
        if(result.length == 0) {
          reject('login faild')
        } else { 
        query = 'update regform set password="'+ hash+'"where  forgettoken='+"'"+result[0].forgettoken+"'";
        db.query(query, (err, result, field) => {
          if(err)
            reject ('not match')
            resolve ('kk successfull change')
        })
      }
      })
    })
    // query = 'insert into regform(forgettoken)values("' + postdata.token + '")';
    // console.log('postdata',postdata.forgettoken)
    // console.log('postdata',postdata)
  })
}




function getwelcomestudents (hello) {
  console.log('^^^^^^^^^^^^^^^^^^',hello)
  return new Promise((resolve, reject) => {
    jwt.verify(hello, 'authendication', function(err, decoded) {
      if (decoded) {
        console.log('%%%%%%%%%%%%%%%%%',decoded)
        resolve (decoded)
      } else {
       console.log('%%%%%%%%%%%%%%%',err)
       reject(err)
      }
    });
  })
}

// function uppdateAllstudents(postdata, id) {
//   console.log('db test');
//   return new Promise((resolve, reject) => {

//     query = 'UPDATE student SET  name="' + postdata.name + '",email="' + postdata.email + '" WHERE id=' + id;
//     console.log(query)
//     db.query(query, (err, result, field) => {

//       console.log('db test', result);

//       if (err)
//         reject(err);

//       resolve("updatesuccess")
//     })
//   })
// }

// function deleteAllstudents(id) {

//   console.log('db test');
//   return new Promise((resolve, reject) => {

//     query = 'delete from student WHERE id=' + id;
//     db.query(query, (err, result, field) => {

//       console.log('db test', result);

//       if (err)
//         reject(err);


//       resolve(result)

//     })
//   })
// } 