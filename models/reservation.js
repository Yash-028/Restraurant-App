const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')


const reservation=new mongoose.Schema({
		reservee:{
			type:String,
			required:true
			},
		contact:{
			type:String,
			required:true	
			},
		guests:{
				type:Number,
				required:true
			},
		date:{
			type:String,
			required:true
			},
		time:{
			type:String,
			required:true
			},
	})
	
const RestaurantAppUser=mongoose.model("RestaurantAppReservation",reservation)
module.exports=RestaurantAppUser;
