const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const mongoose=require('mongoose');
const nodemailer=require('nodemailer');
const app=express();
const cookieparser=require('cookie-parser')
const PORT=process.env.PORT || 3001


dotenv.config({path:'./.env'})
app.use(cors( {origin: "http://localhost:3000",
credentials: true}));
app.use(cookieparser())
app.use(express.json())
require('./db/conn.js')
const authenticate=require('./middleware/authenticate.js')



app.use(require('./routes/auth.js'))

if ( process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
    
}
app.listen(PORT,(req,res)=>{
		console.log("server on at port 3001")
	})


// const transporter = nodemailer.createTransport({
// port: 465,               // true for 465, false for other ports
// host: "smtp.gmail.com",
//    auth: {
//         user: process.env.EMAIL,
//         pass: process.env.WORD,
//      },
// secure: true,
// });

//router.post("/send",function (req,res){
	
	//})
//const mailData = {
//from: process.env.WORD,  // sender address
  //to: 'jagrutichampaneri1@gmail.com',   // list of receivers
  //subject: 'Sending Email using Node.js',
  //text: 'lets try this again!',
  //html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
//};
//transporter.sendMail(mailData, function (err, info) {
   //if(err)
     //console.log(err)
   //else
     //console.log(info);
//});


/*

let transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
   type: "OAuth2",
   user: process.env.EMAIL,
   pass: process.env.WORD,
   clientId: process.env.OAUTH_CLIENTID,
   clientSecret: process.env.OAUTH_CLIENT_SECRET,
   refreshToken: process.env.OAUTH_REFRESH_TOKEN,
 },
});

transporter.verify((err, success) => {
 err
   ? console.log(err)
   : console.log(`=== Server is ready to take messages: ${success} ===`);
});
*/
// app.post("/send", function (req, res) {
//  console.log(req.body)
//  let mailOptions = {
//    from: process.env.EMAIL,
//    to: process.env.EMAIL,
//    subject: "Table Reservation",
//    text: `A table reservation by ${req.body.reservee} for ${req.body.guests} guests on ${req.body.date},${req.body.time}.
//    contact no. ${req.body.contact}`,
//  };

//  transporter.sendMail(mailOptions, function (err, data) {
//    if (err) {
//      console.log("Error " + err);
//    } else {
//      console.log("Email sent successfully");
//      res.json({ status: "Email sent" });
//    }
//  });
// });
// app.post("/sendorder", function (req, res) {
//  console.log(req.body)
//  const cart=req.body.order.cart;
//  const email=req.body.email;
//  let length=cart.length
//  let mailOptions = {
//    from: process.env.EMAIL,
//    to: process.env.EMAIL,
//    subject: "Order",
//    text: `An order is placed by ${req.body.email}.
// Order Details:
// Cart:${cart}
// Address:${req.body.order.address}
// Total:${req.body.order.total}
// Date:${req.body.order.date}`,
//  };

//  transporter.sendMail(mailOptions, function (err, data) {
//    if (err) {
//      console.log("Error " + err);
//    } else {
//      console.log("Email sent successfully");
//      res.json({ status: "Email sent" });
//    }
//  });
// });

