import React,{useState} from 'react';
import {Container} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import validator from 'validator'


const Signup=()=>{
	const [emailError,setEmailError]=useState('')
	const history=useHistory()
	const [passStr,setPassStr]=useState('')
	const [user,setUser]=useState({
			email:"",
			name:"",
			password:"",
			cpassword:"",
			contact:"",
			address:"",
			pincode:"",
		})
	
	let name,value	
	const inputHandle=(e)=>{
			name=e.target.name
			value=e.target.value
			setUser({...user,[name]:value})
			if(name==='email'){
				emailvalidate()
				}
			if(name==='password'){
				passwordValidate()
				}
		}
	
	const postData=async(e)=>{
			e.preventDefault();
			const {name,email,password,cpassword,contact,address,pincode}=user;
			const res=await fetch("/signup",{
					method:"POST",
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify({
							name,email,password,cpassword,contact,address,pincode
						})
				})	
			const data=await res.json();
			if(data.status===422||!data||password!==cpassword){
					window.alert("registration failed");
					//console.log("registration failed")
				}else{
					window.alert("registration success");
					//console.log("registration success");
					
					history.push("/login")
					}
			setUser({
			name:"",
			email:"",
			password:"",
			cpassword:"",
			contact:"",
			address:"",
			pincode:""
				})
		}
	
	const emailvalidate=()=>{
			if(validator.isEmail(user.email)){
					setEmailError("valid")
				}else{
					setEmailError("invalid")
					}
		}
	
	const passwordValidate=()=>{
			if(validator.isStrongPassword(user.password,{minLength:8,minLowercase:1,minUppercase:1,minNumber:2,minSymbols:1})){
					setPassStr("Strong")
				}else{
					setPassStr("Weak")
					}
		}
	return(<>
	<h2 className="text-center my-3">Signup Form</h2>
	<Container className="shadow p-3 signup-form">
	<form method="POST" className="p-2 mt-2">
	  
	  <div className="mb-2">
		<label htmlFor="name" className="form-label">Full Name</label><span className="compulsory">*</span>
		<input type="text" className="form-control" name="name"  value={user.name} onChange={(e)=>{setUser({...user,name:e.target.value})}}/>
	  </div>
	  
	  <div className="mb-2">
		<label htmlFor="email" className="form-label">Email address</label><span className="compulsory">*</span>
		<input type="email" className="form-control" name="email" value={user.email} onChange={inputHandle}/>
		<span style={emailError==="valid"?{fontWeight:'bold',color:"green"}:{fontWeight:'bold',color:"red"}}>{emailError}</span>
	  </div>
	  
	  <div className="mb-2">
		<label htmlFor="password" className="form-label">Password</label><span className="compulsory">*</span>
		<input type="password" className="form-control" name="password" value={user.password} onChange={inputHandle}/>
		<span style={passStr==="Strong"?{fontWeight:'bold',color:"green"}:{fontWeight:'bold',color:"red"}}>{passStr}</span><br/>
		<span style={passStr==="Weak"?{color:"grey"}:{display:"none"}}>
		password must have minimum of 2 digits,1 uppercase,1 special symbol and 8 characters!
		</span>
	  </div>
	  
	  <div className="mb-2">
		<label htmlFor="cpassword" className="form-label">Confirm Password</label><span className="compulsory">*</span>
		<input type="password" className="form-control" name="cpassword" value={user.cpassword} onChange={inputHandle}/>
	  </div>
	 
	  <div className="mb-2">
		<label htmlFor="contactno" className="form-label">Contact No.</label><span className="compulsory">*</span>
		<input type="number" className="form-control" name="contact" value={user.contact} onChange={inputHandle}/>
	  </div>
	 
	  <div className="mb-2">
		<label htmlFor="contactno" className="form-label">Address</label><span className="compulsory">*</span>
		<input type="text" className="form-control" name="address" value={user.address} onChange={inputHandle}/>
	  </div>
	 
	  <div className="mb-2">
		<label htmlFor="pincode" className="form-label">Pincode</label><span className="compulsory">*</span>
		<input type="number" className="form-control" name="pincode" value={user.pincode} onChange={inputHandle}/>
	  </div>
	 
	  <button type="submit" className="btn btn-success btn-lg form-btn" onClick={postData}>Submit</button>
	
	</form>
	</Container>
	
	</>)
	
	}
	
export default Signup
