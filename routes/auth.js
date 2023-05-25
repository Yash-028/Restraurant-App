const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const {OAuth2Client}=require('google-auth-library')
const router=express.Router()
const cookieparser=require('cookie-parser')

require('../db/conn.js')
const RestuarantAppUser=require('../models/schema.js')
const RestuarantAppReservation=require('../models/reservation.js')
const RestuarantAppOrders=require('../models/allorders.js')
const client=new OAuth2Client(process.env.OAUTH_CLIENTID)
const authenticate=require('../middleware/authenticate.js')


//google login
router.post("/googlelogin",authenticate,async(req,res)=>{
		const tokenId=req.body.tokenId
		const response=await client.verifyIdToken({idToken:tokenId,audience:process.env.CLIENT_ID})
		const {email_verified,email,name}=response.payload
				try{
				if(email_verified){
						const userExists=await RestuarantAppUser.findOne({email:email})
						if(userExists){
								const token=await userExists.generateAuthToken();
								//console.log("line 23",userExists)
								res.status(201).json({userExists,token});
							}else{
									let password="SomeRandomGenPassword"
									let cpassword="SomeRandomGenPassword"
									const user=new RestuarantAppUser({name,email,password,cpassword})
									await user.save()
									const userExists=await RestuarantAppUser.findOne({email:email})
									const token=await userExists.generateAuthToken();
								//	console.log("here")
							//		console.log("line 33",userExists)
									res.status(201).json({userExists,token});
								}
							
					}}catch(err){
						console.log(err)
						}
			
	})

//change password --works
router.post('/changepassword',authenticate,async(req,res)=>{
		const currpsw=req.body.newPassword.currPassword
		const newpsw=req.body.newPassword.newPassword
		const cnewpsw=req.body.newPassword.cNewPassword
		const id=req.body.id
		//console.log(currpsw,newpsw,cnewpsw,id)
		try{
		const user=await RestuarantAppUser.findOne({_id:id})
		const isMatch=await bcrypt.compare(currpsw,user.password);
		if(isMatch){
					if(newpsw===cnewpsw){
					const password=await bcrypt.hash(newpsw,10);
					RestuarantAppUser.findByIdAndUpdate(id, { password:password },
					function (err, docs) {
							if (err){
								console.log(err)
								res.status(400).json({message:err})
							}
							else{
								console.log("done")
								res.status(200).json({message:"update success"})
							}
						});
						
						}else{
							console.log("psw not match")
							res.status(400)
							}
					}else{
						console.log("!ismatch")
					res.status(400);
					}
		}catch(err){
				res.json(err)
			}
		
		
	}) 



//change address --works
router.post('/changeaddress',authenticate,async(req,res)=>{
		const address=req.body.newAddress.address
		const pincode=req.body.newAddress.pincode
		const id=req.body.id
		//console.log(address,pincode,id)
		try{
		RestuarantAppUser.findByIdAndUpdate(id, { address:address,pincode:pincode },
        function (err, docs) {
				if (err){
					res.status(400).json({message:err})
				}
				else{
					res.status(200).json({message:"update success"})
				}
			});
		}catch(err){
			res.json(err)
			}
	})


//autologin with token --works
router.post('/autologin',authenticate,async(req,res)=>{
		try{
		const token=req.body.tkn;
	//	console.log(req.body)
		const verifyToken=jwt.verify(token,process.env.SECRETKEY)
		const user=await RestuarantAppUser.findOne({_id:verifyToken._id})
		console.log(verifyToken._id)
		res.send(user)
	}catch(err){
		console.log(err)
		}
	})


//admin getdata --working
router.get("/gettables",authenticate,async(req,res)=>{
		//res.cookie("mycookie","cookie")
				RestuarantAppReservation.find({},(err,tables)=>{
				res.send(tables)
			})
	})
router.get("/getorders",authenticate,async(req,res)=>{
		RestuarantAppOrders.find({},(err,orders)=>{
				res.send(orders)
			})
	})
router.post("/userinfo",authenticate,async(req,res)=>{
		const email=req.body.email
		//console.log(email,req.body)
		const userExists=await RestuarantAppUser.findOne({email:email})
		if(!userExists){
						res.json()
					}else{
						console.log("before send")
						res.json(userExists)
						}
	})


//chexkout --works
router.post('/checkout',authenticate,async(req,res)=>{
		const email=req.body.email
		const order=req.body.order
		
		//console.log(email,order)
		try{
			const userExists = await RestuarantAppUser.findOne({email})
				if(userExists){
						//console.log(userExists._id)
						let myquery = { email: email };
						let newvalues = { $addToSet: {orders: order } };
						await RestuarantAppUser.updateOne(myquery,newvalues,(err,res)=>{
							if (err) throw err;
							console.log("1 document updated");
							})
						const orders=new RestuarantAppOrders({email,order})
						await orders.save()
						return res.status(201).json({message:"updated"})
					}
			}catch(err){
				console.log(err)
				}	
	})
	
	
//save cart --works
router.post('/savecart',async(req,res)=>{
		const cart=req.body.cart
		const email=req.body.email
		console.log("inside save cart")
		try{
			const userExists = await RestuarantAppUser.findOne({email})
				if(userExists){
						console.log(userExists._id)
						let myquery = { email: email };
						let newvalues = { $set: {cart: cart } };
						await RestuarantAppUser.updateOne(myquery,newvalues,(err,res)=>{
							if (err) throw err;
							console.log("1 document updated");
							})
						return res.status(201).json({message:"updated"})
					}
			}catch(err){
				console.log(err)
				}	
	})



//book table --works
router.post('/booktable',authenticate,async (req,res)=>{
		const reservee=req.body.reservee
		const contact=req.body.contact
		const guests=req.body.guests
		const date=req.body.date
		const time=req.body.time;
//		console.log(req.body)
	//	console.log(reservee,contact,guests,date,time)
		if(!reservee||!contact||!guests||!date||!time){
				return res.status(422).json({error:"Fill all fields"})
			}
		try{
			const currDate=new Date()
				if(date<currDate){
						return res.status(422).json({error:"date already passed"})
					}
				const user=new RestuarantAppReservation({reservee,contact,guests,date,time})
				await user.save()
				res.status(201).json({message:"reservation request received"})
			}catch(err){
				console.log(err)
				}	
	})
	
	
	
//signup --works
router.post('/signup',async (req,res)=>{
		const {name,email,password,cpassword,contact,address,pincode}=req.body;
		console.log(req.body)
		if(!email|!name||!password||!cpassword||!contact){
				return res.status(422).json({error:"Fill all compulsory fields"})
			}
		try{
			
			const userExists = await RestuarantAppUser.findOne({email:email})
				if(userExists){
						return res.status(422).json({error:"user already exists"})
					}
				
				if(password!==cpassword){
						return res.status(422).json({error:"password does not match"})
					}
				const user=new RestuarantAppUser({email,name,password,cpassword,contact,address,pincode})
				await user.save()
				res.status(201).json({message:"user registered"})
			}catch(err){
				console.log(err)
				}	
	})
		

//login --works
router.post('/login',async (req,res)=>{
	
		const {email,password}=req.body;
		const userExists = await RestuarantAppUser.findOne({email:email})
				if(!email||!password){
					res.status(400).json({err:"please fill all fields"})
				}
				if(!userExists){
						return res.status(422).json({error:"user not registered"})
					}else{
							try{
							//const token=await userExists.generateAuthToken();
							const isMatch=await bcrypt.compare(password,userExists.password);
					
						const token=await userExists.generateAuthToken();
						console.log(265,token)							
							if(isMatch){
							// res.cookie("jwtoken",token,{
							// 		httpOnly:true,
							// 	})
							// res.status(201).json({userExists,token});
							res.cookie("logintoken",token,{
								})
							res.status(200).json({userExists})
							}else{
									res.json("invalid login details");
								}
						
					//	console.log(token)
						}catch(err){
								res.json({err})
							}
						}
				
		
	})


	router.get("/home",authenticate,(req,res)=>{
		res.send(req.rootUser)
	})
	router.get("/checkout",authenticate,(req,res)=>{
		res.status(200).json({message:"authorised user"})
	})
	router.get("/userinfo",authenticate,(req,res)=>{
		res.status(200).json({message:"authorised user"})
	})
	router.get("/logout",(req,res)=>{
		res.clearCookie("logintoken")
		res.status(200).json({message:"logout success"})
	})
module.exports=router
