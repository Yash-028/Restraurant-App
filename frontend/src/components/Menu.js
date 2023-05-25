import React,{useState,useContext,useEffect} from 'react';
import {Button,Container} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import Card from './Card.js'
import data from '../context/data.js'
import {LoginStateContext} from '../context/loginStateContext.js'


const Menu=()=>{
	//const [login,setLogin]=useContext(LoginStateContext);
	
	return(<> 
	<Container className="menu-container"> 
	<h2 className="m-2">Apetizers</h2>
	 <div className="display-div overflow-auto">
	{ 
		data[0].map((item,index)=>{
		 return(
			<Card  
			key={index}
			id={item.dish_id}
			dishName={item.dish_name}
			description={item.description}
			rating={item.rating}
			price={item.price}
			quantity={item.quantity}
			comments={item.comments}
			img_src={item.img_src}
			/>);
		 })
	 }
	 </div>
	 <hr/>
	<h2 className="m-2">Indian Style Soup</h2>
	<div className="display-div overflow-auto">
	{ 
		data[1].map((item,index)=>{
		 return(
			<Card  
			key={index}
			id={item.dish_id}
			dishName={item.dish_name}
			description={item.description}
			rating={item.rating}
			price={item.price}
			quantity={item.quantity}
			comments={item.comments}
			img_src={item.img_src}
			/>);
		 })
	 }
	 </div>
	 <hr/>
	<h2 className="m-2">Tandoori Delicacies</h2>
	<div className="display-div overflow-auto">
	 { 
		data[2].map((item,index)=>{
		 return(
			<Card  
			key={index}
			id={item.dish_id}
			dishName={item.dish_name}
			description={item.description}
			rating={item.rating}
			price={item.price}
			quantity={item.quantity}
			comments={item.comments}
			img_src={item.img_src}
			/>);
		 })
	 }
	 </div>
	 <hr/>
	 <h2 className="m-2">Chicken Specialities</h2>
	<div className="display-div overflow-auto">
	 { 
		data[3].map((item,index)=>{
		 return(
			<Card  
			key={index}
			id={item.dish_id}
			dishName={item.dish_name}
			description={item.description}
			rating={item.rating}
			price={item.price}
			quantity={item.quantity}
			comments={item.comments}
			img_src={item.img_src}
			/>);
		 })
	 }
	 </div>
	 <hr/>
	 <h2 className="m-2">Seafood Specialities</h2>
	<div className="display-div overflow-auto">
	 { 
		data[4].map((item,index)=>{
		 return(
			<Card  
			key={index}
			id={item.dish_id}
			dishName={item.dish_name}
			description={item.description}
			rating={item.rating}
			price={item.price}
			quantity={item.quantity}
			comments={item.comments}
			img_src={item.img_src}
			/>);
		 })
	 }
	 </div>
	 <hr/>
	 <h2 className="m-2">Biryani</h2>
	<div className="display-div overflow-auto">
	 { 
		data[5].map((item,index)=>{
		 return(
			<Card  
			key={index}
			id={item.dish_id}
			dishName={item.dish_name}
			description={item.description}
			rating={item.rating}
			price={item.price}
			quantity={item.quantity}
			comments={item.comments}
			img_src={item.img_src}
			/>);
		 })
	 }
	 </div>
	 <hr/>
	 <h2 className="m-2">Vegetable Specialities</h2>
	<div className="display-div overflow-auto">
	 { 
		data[6].map((item,index)=>{
		 return(
			<Card  
			key={index}
			id={item.dish_id}
			dishName={item.dish_name}
			description={item.description}
			rating={item.rating}
			price={item.price}
			quantity={item.quantity}
			comments={item.comments}
			img_src={item.img_src}
			/>);
		 })
	 }
	 </div>
	 <hr/>
	 <h2 className="m-2">Tandoori Bread</h2>
	<div className="display-div overflow-auto">
	 { 
		data[7].map((item,index)=>{
		 return(
			<Card  
			key={index}
			id={item.dish_id}
			dishName={item.dish_name}
			description={item.description}
			rating={item.rating}
			price={item.price}
			quantity={item.quantity}
			comments={item.comments}
			img_src={item.img_src}
			/>);
		 })
	 }
	 </div>
	 <hr/>
	 <h2 className="m-2">Deserts</h2>
	<div className="display-div overflow-auto">
	 { 
		data[8].map((item,index)=>{
		 return(
			<Card  
			key={index}
			id={item.dish_id}
			dishName={item.dish_name}
			description={item.description}
			rating={item.rating}
			price={item.price}
			quantity={item.quantity}
			comments={item.comments}
			img_src={item.img_src}
			/>);
		 })
	 }
	 </div>
	 <hr/>
	 <h2 className="m-2">Beverages</h2>
	<div className="display-div overflow-auto">
	 { 
		data[9].map((item,index)=>{
		 return(
			<Card  
			key={index}
			id={item.dish_id}
			dishName={item.dish_name}
			description={item.description}
			rating={item.rating}
			price={item.price}
			quantity={item.quantity}
			comments={item.comments}
			img_src={item.img_src}
			/>);
		 })
	 }
	 </div>
	 </Container>
	</>)
	}
export default Menu
