const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
		name:{
			type:String,
			required:true
			},
		email:{
			type:String,
			required:true
			},
		password:{
			type:String,
			required:true
			},
		cpassword:{
			type:String,
			required:true
			},
		contact:{
			type:Number,
			required:false	
			},
		address:{
			type:String,
			required:false
			},
		pincode:{
			type:Number,
			required:false
			},
		cart:{
			},
		orders:[
		],
		tokens:[{
				token:{
						type:String,
						required:true,
					}
			}],
		
	},{strict:false})
	
userSchema.pre('save',async function(next){
		
			if(this.isModified('password')){
					
					this.password=await bcrypt.hash(this.password,10);
					this.cpassword=await bcrypt.hash(this.cpassword,10);
				}
			
				next();
		})
		
		
userSchema.methods.generateAuthToken=async function(){
			try{
				const token=jwt.sign({_id:this._id.toString()},process.env.SECRETKEY);
				this.tokens=this.tokens.concat({token})
				await this.save();
				return token;
				}catch(err){
				console.log("generate  "+err)
				}
				next();
		}
		
const RestaurantAppUser=mongoose.model("RestaurantAppUser",userSchema)
module.exports=RestaurantAppUser;
