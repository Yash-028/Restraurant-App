const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')


const allorders=new mongoose.Schema({},{strict:false})
	
const RestaurantAppOrders=mongoose.model("RestaurantAppOrders",allorders)
module.exports=RestaurantAppOrders;
