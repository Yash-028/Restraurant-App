import React,{useContext,useState} from 'react';
import {NavLink} from 'react-router-dom'
import {Container,Row,Col,Button} from 'react-bootstrap'
import {ItemContext} from '../context/ItemContext.js'
import {LoginStateContext} from '../context/loginStateContext.js'
import {CartContext} from '../context/cartContext.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'



const ItemDetail=()=>{
		
		const [item,setItem]=useContext(ItemContext);
		const [login,setLogin]=useContext(LoginStateContext);
		const [cart,setCart]=useContext(CartContext);
		//const [comment,setComment]=useState("")
		
		console.log(cart)
		const addToCart=()=>{
			if(login){
						const repeatCheck=cart[cart.findIndex(x=>x.id===item.id)]
						if(!repeatCheck){
						const itemToCart={
								...item
							}
						setCart([...cart,itemToCart])
						window.alert("added to cart")
						}else{
				//				console.log(cart)
								setCart([...cart])
								window.alert("added to cart")
							}
			
			//console.log(cart)
		}else{
				window.alert("you have to login first")
			}
			
			}
		//const addComment=()=>{
				//const updatedComments=[...item.comments,{username:"user1",comment:comment}]
				//const newItem={...item,comments:updatedComments}
				//setItem(newItem)
				//setComment("")
			//}	
		
		return(
		<>	
			<Container className="col-lg-10">
			  <Row>
				<Col xs={12} md={6} className="mt-5 px-0 text-center">
					
					<img className="mt-3 p-1 item-detail-img" src={item.img_src} alt="img"/>
					
				</Col>
				<Col xs={12} md={6} className="mt-5 px-1 col-sm-12 ">
					<h1 className="ml-1 mt-3">{item.dishName}</h1><br/>
					<p className="text-justify mx-1">{item.description}</p><br/>
					<p className="text-justify mx-1">Price Rs.{item.price}</p><br/>
					<br/>
					<h3 className="text-left ml-1">Rating:{item.rating}<FontAwesomeIcon icon={faStar} className="star"/ ></h3><br/>
					
					<Button variant="success" className="text-center w-50 btn-lg" onClick={addToCart}>
					Add to cart
					</Button>
					
					<Button className="text-center float-right w-50 btn-lg" ><NavLink 
					to="/menu" style={{color:"white",textDecoration:"none"}}>
					Back to menu</NavLink></Button>
					
					
				</Col>
			  </Row>
			</Container>
		
		
		</>
		)
	}

export default ItemDetail
	
