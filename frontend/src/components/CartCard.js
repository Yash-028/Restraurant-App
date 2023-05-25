import React,{useContext,useState} from 'react'
import {Button,Container,Row,Col,Card} from 'react-bootstrap'
import {OrderDetailContext} from '../context/OrderDetailContext.js'
import {CartContext} from '../context/cartContext.js'

const CartCard=(props)=>{
	const [qty,setQty]=useState(props.quantity)
	const [cart,setCart]=useContext(CartContext);	
	
	
	const inputHandle=(e)=>{
			setQty(e.target.value)
		}
	
	
	
	return(
		<Card xs={12} className="m-1 p-0 cartcard">
		  <Card.Img className="card-img img-fluid" src="https://picsum.photos/300/200" />
		  <Card.Body className="p-1 my-auto">
			<p>{props.dishName}</p>
			<p>{props.price}</p>
			<p>quantity={props.quantity}</p>
		  </Card.Body>
		</Card>)
		}


export default CartCard
	
