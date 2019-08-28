const nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karthi.indras@gmail.com',
        pass: 'IndrasSiva'
    }
});
const mailOptions = {
    from: 'karthi.indras@gmail.com',
    to: 'muniraj.rajammal@gmail.com',
    subject: 'Subject of your email',
    html: '<p>Your html here</p>'
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});