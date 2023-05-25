const mongoose=require('mongoose')
const dotenv=require('dotenv')
const DB=process.env.DB


mongoose.connect(DB,{
	useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology:true,
	useFindAndModify:false
	
	}).then(()=>{
	console.log('connection successful')
	}).catch((err)=>console.log(err))
