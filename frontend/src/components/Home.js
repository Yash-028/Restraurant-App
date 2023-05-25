import React,{useContext,useEffect,useState} from 'react'
import {Button,Col,Container,Row} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import logo from '../'
import {UserContext} from '../context/userDetailContext.js'
import {LoginStateContext} from '../context/loginStateContext.js'
import {CartContext} from '../context/cartContext.js'

const Home=()=>{
	const [user,setUser]=useContext(UserContext)
	const [cart,setCart]=useContext(CartContext)
	const [login,setLogin]=useContext(LoginStateContext);
	//let getToken=""
	//const [token,setToken]=useState("");
// useEffect(()=>{
// 		getToken=localStorage.getItem('token')
// 		if(getToken && !login){
// 		//setToken(getToken)
// 		autoLogin()}
// 	},[])
	// const autoLogin=async()=>{
	// 	let tkn=getToken;
	// //	console.log(tkn)
	// 	try{
	// 		const res=await	fetch("/autologin",{
	// 					method:"POST",
	// 				headers:{"Content-Type":"application/json"},
	// 				body:JSON.stringify({tkn,login})
	// 			})
	// 		const userData=await res.json();
	// 	//	console.log(userData)
	// 		setUser(userData)
	// 		setCart(userData.cart)
	// 		setLogin(true)
	// 		}catch(err){
	// 			console.log(err)
	// 			}
	// 	}
	useEffect(()=>{
        authenticate()
    },[])
    const authenticate = async() => {
        const loginState=await fetch("/home",{
			method:"GET",
			credentials:'include',
		})
		const resdata=await loginState.json()
		if(loginState.status===200){
			setLogin(true)
			setUser(resdata)
			if(!resdata.cart){
				setCart([])
			}else{
				setCart(resdata.cart)
			}
		}
    }
	
	return(
	<>
	
	<Container className="col-lg-4 col-sm-12 home-container shadow bg-light">
					<h1>Welcome to Restaurant OP</h1><br/>
					<h3>We aim to provide best service at users comforts!!</h3>
					<br/>
					<br/>
					<Button className="ml-1"><NavLink to="/booktable" style={{color:"white",textDecoration:"none"}}>Book a table</NavLink></Button>
					<Button className="order-btn float-right mr-2" id="home_order"><NavLink to="/menu" style={{color:"white",textDecoration:"none"}}>Order Now</NavLink></Button>
	</Container>
	</>)
	}

export default Home;
