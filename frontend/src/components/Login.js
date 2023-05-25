import React,{useState,useEffect,useContext} from 'react';
import {Container,Form,Button} from 'react-bootstrap'
import {LoginStateContext} from '../context/loginStateContext.js'
import {UserContext} from '../context/userDetailContext.js'
import {CartContext} from '../context/cartContext.js'
import {useHistory,NavLink} from 'react-router-dom'
import GoogleLogin from 'react-google-login';

const Login=()=>{
	const [email,setEmail]=useState("")
	const [password,setPassword]=useState("")
	const [user,setUser]=useContext(UserContext)
	const [login,setLogin]=useContext(LoginStateContext);
	const [cart,setCart]=useContext(CartContext);
	const history=useHistory()	
	useEffect(()=>{
        authenticate()
    },[])
    const authenticate = async() => {
        const res=await fetch("/home",{
			method:"GET",
			credentials:'include',
		})
		if(res.status===200)
		{
			history.push("/")
		}
    }
	const userLogin=async(e)=>{
				e.preventDefault();
			if(email===process.env.REACT_APP_ADMIN_ID && password===process.env.REACT_APP_ADMIN_PASS){
				history.push("/admin")
				}else{
			const res=await	fetch("/login",{
						method:"POST",
						credentials: 'include',
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify({
						email,password
					})
				})
			const userData=await res.json();
			console.log(userData.userExists.cart)
			setUser(userData.userExists)
			localStorage.setItem('token',userData.token)
	//	console.log(userData.token)
			if(res.status!==200||!userData){
					window.alert("invalid credentials")
				}else{
					window.alert("login success")
					setLogin(true)
					if(!userData.userExists.cart){
						console.log("before set cart")
						const emptyCart=[]
						setCart(emptyCart)
						console.log(CartContext)
					}else{
						setCart(userData.userExists.cart)
						}
					//console.log(userData.userExists)
					setEmail("");
					setPassword("");}
					history.push("/")
			}}
	
			
		const responseGoogle=async(response)=>{
			//console.log(response)
			const tokenId=response.tokenObj.id_token
		//	console.log(tokenId)
				const res=await fetch("/googlelogin",{
					method:"POST",
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify({
						tokenId
					})
					})
					const data=await res.json()
					setUser(data.userExists)
					localStorage.setItem('token',data.token)
					if(res.status!==201||!res){
						window.alert("invalid credentials")
					}else{
						window.alert("login success")
						setLogin(true)
						if(!data.userExists.cart){
							setCart([])
						}else{
							setCart(data.userExists.cart)
						}
					history.push("/")
			}
					
			}
		//LbLQ2wgDe3e9K1RZl7z0XsNC profileObj->email ,name
	return(<>
	<h2 className="text-center my-3">Login Form</h2>
	<Container className="shadow p-3 mt-5 login-form">
	<form method="POST" className="">
	  <div className="mb-3">
		<label htmlFor="email" className="form-label">Email address</label>
		<input type="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
		<div id="emailHelp" className="form-text">We'll never share your email with anyone else.
		</div>
	  </div>
	  <div className="mb-3">
		<label htmlFor="password" className="form-label">Password</label>
		<input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
	  </div>
	  <button type="submit" className="btn btn-success form-btn btn-lg" onClick={userLogin}>Submit</button>
	</form>
	<hr/>
	<Button className="gLogin">
	<GoogleLogin
    clientId="829000374443-bld3o83gnl2l3llr5grat1a1f4nevjfl.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
	</Button>
	<p className="text-center">Not Registered? <NavLink to="/signup">SignUp</NavLink></p>
	
	</Container>
	
	</>)
	
	}
	
export default Login





