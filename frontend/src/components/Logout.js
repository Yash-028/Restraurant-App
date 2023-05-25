import React,{useEffect,useContext} from 'react';
import {useHistory} from 'react-router-dom'
import {LoginStateContext} from '../context/loginStateContext.js'
import { UserContext } from '../context/userDetailContext.js';
import { CartContext } from '../context/cartContext.js';
const Logout = () => {
    const history=useHistory()
    const [login,setLogin]=useContext(LoginStateContext);
    const [user,setUser]=useContext(UserContext);
    const [cart,setCart]=useContext(CartContext);
    useEffect(() => {
     console.log("effect")   
     logout()   
    }, []);
    const logout = async() => {
        const res=await fetch("http://localhost:3001/logout",{
            method:"GET",
            credentials:"include"
        })
        if(res.status===200){
            saveCart()
            setLogin(false)
            history.push('/')
        }else{
            window.alert("something went wrong")
        }
        console.log("lt out")
    }
    const saveCart=async()=>{
		console.log("save cart")
		let email=user.email
			const res=await	fetch("http://localhost:3001/savecart",{
					method:"POST",
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify({
						cart,email
					})
				})
			//console.log("here")
			const userData=await res.json();
			if(res.status!==201||!userData){
					window.alert("cart save unsuccessful")
                    console.log("if")
				}else{
					window.alert("cart save success")
					setCart([]);
                    console.log("else")
			}
		}
    return (
        <>
        
        </>
    );
}

export default Logout;
