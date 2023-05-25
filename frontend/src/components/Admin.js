import React,{useEffect,useState} from 'react';
import {Row,Col,Container,Button} from 'react-bootstrap'


const Admin=()=>{
	useEffect(()=>{
			fetchOrders();
			fetchTables();
		},[])
	const[tableData,setTableData]=useState([])
	const[orderData,setOrderData]=useState([])
	const[userData,setUserData]=useState({})
	const[search,setSearch]=useState("")
	
	const fetchTables=async()=>{
		const tables=await fetch("/gettables")
		const resData=await tables.json()
		setTableData(resData)
	}
	const fetchOrders=async()=>{
		const orders=await fetch("/getorders")
		const resOrderData=await orders.json()
		setOrderData(resOrderData)
		console.log(resOrderData)
	}
	const searchUser=async()=>{
		let email=search;
		try{
			const res=await	fetch("/userinfo",{
						method:"POST",
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify({email})
				})
			const resData=await res.json();
			if(resData){
			setUserData(resData);
			}else{
				setUserData({})
				}
			//console.log(userData)
		}catch(err){
				setUserData({})
			}
		}
		return(<>
		<Container className="col-lg-10">
		<Row>
		<Col xs={12} lg={6} className="my-5 order-col">
		<Container className="all-orders shadow">
				<h3 className="p-3">All Orders</h3>
				<hr/>
				<Container className="display-order-admin shadow">
				{
				orderData.map((order)=>{
						return(
						<div className="py-2">
						<h6><b>user email</b>: {order.email}</h6>
						<h6><b>delivery address</b>: {order.order.address}</h6>
						<h6><b>Pincode</b>: {order.order.pincode}</h6>
						<h6><b>Order total</b>: Rs.{order.order.total}</h6>
						<h6><b>date and time</b>: {order.order.date}</h6>
						<h6><b>Order</b>:</h6>
						{
							
							order.order.cart.map((item)=>{
								return(
								<h6>{item.dishName} : {item.quantity}</h6>
								)
								})
							}
						<hr/>
						</div>
						)	
					})
				}
				</Container>
		
		</Container>
		</Col>
		<Col xs={12} lg={6} className="my-5">
		<Row>
		<Container className="user-info shadow-sm">
				<h3 className="p-3">User Info</h3>
				<hr/>
				<input type="email" placeholder="user email" value={search} onChange={(e)=>{setSearch(e.target.value)}} className="user-search-admin"/>
				<Button variant="success" className="search-btn-admin" onClick={searchUser}>Search</Button>
				<Container className="user-info-admin mt-3 shadow py-3">
				{	<div>		
					<div className={"p-3 "+(userData.name?"":"d-none")}>
					<h6><b>Name</b>:{userData.name}</h6>
					<h6><b>Address</b>:{userData.address}</h6> 
					<h6><b>pincode</b>:{userData.pincode}</h6>
					<h6><b>Contact</b>:{userData.contact}</h6>
					</div>
					<div className={"p-3 u-not-found "+(userData.name?"d-none":"")}>
					<h4 className="text-capitalize">User not found</h4>
					</div>
					</div>
					}
				</Container>
		</Container>
		</Row>
		<Row>
		<Container className="table-reserve shadow-sm">
				<h3 className="p-3">Table Reservation</h3>
				<hr/>
					<Container className="table-reserve-admin shadow">
				{
				tableData.map((table)=>{
						return(
						<div>
						<h6><b>reservee name</b>:{table.reservee}</h6>
						<h6><b>no. of guests</b>:{table.guests}</h6>
						<h6><b>contact</b>:{table.contact}</h6>
						<h6><b>reservation date and time</b>: {table.date} {table.time}</h6>
						<hr/>
						</div>
						
						)
					
					})
				
	}
				</Container>
				
		</Container>
		</Row>
		</Col>
		</Row>
		</Container>
		</>)
	}
export default Admin;
