import React,{useContext,useState,useEffect} from 'react'
import {Button,Container,Row,Col} from 'react-bootstrap'
import {CartContext} from '../context/cartContext.js'
import {OrderDetailContext} from '../context/OrderDetailContext.js'
import {UserContext} from '../context/userDetailContext.js'
import {NavLink,useHistory} from 'react-router-dom' 

const Checkout=()=>{
	const [cart,setCart]=useContext(CartContext)
	const [orderDetail,setOrderDetail]=useContext(OrderDetailContext)
	const [user,setUser]=useContext(UserContext)
	const [placeOrderState,setPlaceOrderState]=useState(false)
	const [qty,setQty]=useState(1)
	const [orderTotal,setOrderTotal]=useState(0)
	const [address,setAddress]=useState("")
	const [pincode,setPincode]=useState("")
	const history=useHistory()
	useEffect(()=>{
        authenticate()
    },[])
    const authenticate = async() => {
        const res=await fetch("/checkout",{
			method:"GET",
			credentials:'include',
		})
		console.log(res.status)
        if(res.status!==200){
			history.push("/login")
		}
    }
	
	
	useEffect(()=>{
			//totalAmount()
			if(user){
					setAddress(user.address);
					setPincode(user.pincode);
				}	
		},[])
	//console.log(cart)
	const totalAmount=()=>{
		//console.log(cart.length)
			if(cart.length!==0){
			//		console.log("before total",cart)
					const res=cart.reduce((prev,item)=>{return prev+(item.price*item.quantity)},0)
				//	console.log(res)
					setOrderTotal(res)					
					//console.log("after total",cart)
				}
			else{
					setOrderTotal(0)
					//console.log("here")
				}
				
		}
	
	const placeOrderControl=()=>{
			setPlaceOrderState(true)
		//	console.log(cart)
			totalAmount()
		}
	const increase=(index,id)=>{
		
		  setQty(++cart[index].quantity)
		  setCart(cart)
		  totalAmount()
		}
	const decrease=(index,id)=>{
		  if(cart[index].quantity){
		  setQty(--cart[index].quantity)
			setCart(cart)
			totalAmount()}
		}
	const removeItem=(id)=>{
		console.log("before remove",cart)
			const newCart= cart.filter((item)=>{
					if(item.id!==id){
							return item
						}
				})
			setCart(newCart)
			//console.log("after remove",cart)
			totalAmount()
		}
	const placeOrder=async ()=>{
			let date=new Date
			let order={cart,address:address,pincode:pincode,total:orderTotal,date:date.toLocaleString()}
			let email=user.email
			let templateVar={order,email}
			//console.log(email,order)
			// emailjs.send('service_hbsmmu5', 'template_5rir92d',	templateVar, process.env.REACT_APP_USER_KEY)
			// .then(function(response) {
			//    console.log('SUCCESS!', response.status, response.text);
			// }, function(error) {
			//    console.log('FAILED...', error);
			// });
			const res=await	fetch("/checkout",{
						method:"POST",
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify({
						email,order
					})
				})
			const userData=await res.json();
			if(res.status!==201||!userData){
					window.alert("order place unsuccessful")
				}else{
					//window.alert("please wait... we are processing your request")
					
					//const mailRes=await	fetch("/sendorder",{
									//method:"POST",
									//headers:{"Content-Type":"application/json"},
									//body:JSON.stringify(
									//{email,order}
								//)
							//})
						//const mailData=await mailRes.json();
					
					window.alert("order place success")
					setCart([]);
					setAddress("")
					setPincode("")
					history.push("/")
			}
			}
		//	console.log(cart)
	
	return(<>
	<Container className="checkout-container">
	<Row>
        <Col xs={12} lg={6}>
        <div className="display-cart text-left mt-3 shadow">
        <p className="text-capitalize mt-2 p-3 h3">Your Cart</p>
        <hr/>
        <Container className="checkout-cart">
      {cart &&
		cart.map((item,index)=>{
		 return(
			
			<div class="card col-sm-12 p-0 my-1 cartcard">
			<div class="card-horizontal m-1" style={{display:"flex",flex:"1 1 auto;"}}>
				<div class="conatiner-fluid">
					<img class="h-100 cartCardImg" src={item.img_src} alt="Card image cap"/>
				</div>
				<div class="card-body p-2">
					<h4 class="card-title">{item.dishName}</h4>
					<h5>Price:Rs. {item.price}</h5>
					<div>
						<Button variant="success" className={(placeOrderState)?"disabled":""} onClick={()=>{increase(index,item.id)}}>+</Button>
						<span className="m-2">{item.quantity}</span>
						<Button variant="danger" className={(placeOrderState)?"disabled":""} onClick={()=>{decrease(index,item.id)}}>-</Button>
					</div>
					<p className="mt-2 text-capitalize">subtotal=Rs {item.price*item.quantity}</p>
					<Button variant="danger" className={(placeOrderState)?"disabled":""} onClick={()=>{removeItem(item.id)}}>Remove</Button>
				</div>
			</div>
			</div>
			
			)
			
		 })
	 }
	 </Container>
	 <hr/>
	 <Button variant="success" onClick={placeOrderControl} className={(placeOrderState)?"disabled w-50 btn-lg":"w-50 btn-lg"}>Confirm order</Button>
	<Button  className="text-center float-right w-50 btn-lg" ><NavLink to="/menu" style={{color:"white",textDecoration:"none"}}>
		Back to menu
		</NavLink></Button>
        
        </div>
        </Col>
        <Col>
        <div className="place-order-div mt-3 shadow">
        <h3 className="p-3">Order Details</h3>
        <hr/>
        <h4 className="my-1 text-capitalize px-3">order total=Rs. {orderTotal}</h4>
        
		<div className="address-div">
		<p className="h4 mt-3 text-capitalize">Enter Address<span className="compulsory">*</span></p>
			<input type="textarea" className="w-100 h-25 my-1 p-2" placeholder="Address" defaultValue={address} onChange={(e)=>{setAddress(e.target.value)}}/><br/>
		<p className="h4 mt-3 text-capitalize">Enter Pincode<span className="compulsory">*</span></p>
			<input type="textarea" className="w-100 h-25 my-1 p-2" placeholder="Pincode" defaultValue={pincode} onChange={(e)=>{setPincode(e.target.value)}}/><br/>
		</div>
        
        <p className="text-muted px-1 mt-2">*please enter pincode along with address or else order won't be considered!</p>
        <p className="text-muted px-1">*Currently we support COD only on all orders! we will add more payments method soon!</p>
        <Button variant="success w-100" className={(placeOrderState)?"btn-lg text-capitalize":"btn-lg text-capitalize disabled"}  onClick={placeOrder}>place order</Button>
        </div>
        </Col>
    </Row>
    </Container>
	</>)
	}
	
export default Checkout
