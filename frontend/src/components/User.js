import React,{useState,useEffect,useContext} from 'react';
import {Container,Button,Row,Col,Modal} from 'react-bootstrap';
import {UserContext} from '../context/userDetailContext.js'
import {LoginStateContext} from '../context/loginStateContext.js'
import {useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


const User=()=>{
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [pshow, setPShow] = useState(false);
	const phandleClose = () => setPShow(false);
	const phandleShow = () => setPShow(true);
	const [user,setUser]=useContext(UserContext);
	const [login,setLogin]=useContext(LoginStateContext);
	const history=useHistory()
	const [newAddress,setNewAddress]=useState({
			address:"",
			pincode:null,
		})
	const [newPassword,setNewPassword]=useState({
			currPassword:"",
			newPassword:"",
			cNewPassword:""
		})
	
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
	
	
	const changeAddress=async (e)=>{
		e.preventDefault();
//		console.log(newAddress.address,newAddress.pincode)
		let id=user._id
		const res=await fetch("/changeaddress",{
					method:"POST",
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify({
							newAddress,id
						})
				})	
			const data=await res.json();
			if(res.status===200){
				window.alert("updated successfully! changes will be applied when you login again!")
				setNewAddress({
			address:"",
			pincode:null,
		})
				}
		}
	const changePassword=async(e)=>{
		e.preventDefault();
		let id=user._id
		const res=await fetch("/changepassword",{
					method:"POST",
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify({
							newPassword,id
						})
				})	
		if(res.status===200){
				window.alert("updated! you will be logged out. please login again!")
				setNewPassword({
					currPassword:"",
			newPassword:"",
			cNewPassword:""
					})
				setLogin(false)
				localStorage.clear()
				history.push('/')
				
			}
		}
	let name,value
	const inputHandle=(e)=>{
			name=e.target.name
			value=e.target.value
			if(name==="address"||name==="pincode"){
			setNewAddress({...newAddress,[name]:value})
			}else{
				setNewPassword({...newPassword,[name]:value})
				}
		}
		console.log(user)
		return(<>
		<Container className="user shadow my-5 p-5 col-lg-10 bg-light">
		<Row>
		
		
		<Col xs={12} lg={6} className="user-info-col">
		<h3 className="p-3">User Info</h3>
		<hr/>
		<h4>Name: {user.name}</h4><br/>
		<h4>Email: {user.email}</h4><br/>
		<div className="d-flex">
		<h4>Address: {user.address} pincode:{user.pincode}</h4>
		<Button variant="primary" id="user-btn" className="bg-light text-primary border-0" onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit}/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form method="POST" className="p-2 mt-2">
			  <div className="mb-3">
				<label htmlFor="contactno" className="form-label">Address</label><span className="compulsory">*</span>
				<input type="text" className="form-control" name="address" value={newAddress.address} onChange={inputHandle}/>
			  </div>
			 
			  <div className="mb-3">
				<label htmlFor="pincode" className="form-label">Pincode</label><span className="compulsory">*</span>
				<input type="number" className="form-control" name="pincode" value={newAddress.pincode} onChange={inputHandle}/>
			  </div>
			 
			  <button type="submit" className="btn btn-success btn-lg form-btn" onClick={changeAddress}>Submit</button>
			
	</form>
	</Modal.Body>
      </Modal>
		</div>
		<br/>
		<h4>Contact: {user.contact}</h4><br/>
		<Button variant="primary" onClick={phandleShow}>
        Change Password
      </Button>

      <Modal show={pshow} onHide={phandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form method="POST" className="p-2 mt-2">
			  <div className="mb-3">
				<label htmlFor="contactno" className="form-label">Current Password</label><span className="compulsory">*</span>
				<input type="password" className="form-control" name="currPassword" value={newPassword.currPassword} onChange={inputHandle}/>
			  </div>
			
			  <div className="mb-3">
				<label htmlFor="contactno" className="form-label">New Password</label><span className="compulsory">*</span>
				<input type="password" className="form-control" name="newPassword" value={newPassword.newPassword} onChange={inputHandle}/>
			  </div>
			 
			  <div className="mb-3">
				<label htmlFor="pincode" className="form-label">Confirm New Password</label><span className="compulsory">*</span>
				<input type="password" className="form-control" name="cNewPassword" value={newPassword.cNewPassword} onChange={inputHandle}/>
			  </div>
			 
			  <button type="submit" className="btn btn-success btn-lg form-btn" onClick={changePassword}>Submit</button>
			
	</form>
	</Modal.Body>
      </Modal>
		<br/>
		<br/>
		</Col>
		
		
		<Col xs={12} lg={6} className="user-order-col">
		<Container className="user-order shadow bg-light">
				<h3 className="p-3">All Orders</h3>
				<hr/>
				<Container className="user-order-display col-sm-12">
				{
				user.orders.map((order)=>{
						return(
						<div className="py-2">
						<h6><b>delivery address</b>: {order.address}</h6>
						<h6><b>Pincode</b>: {order.pincode}</h6>
						<h6><b>Order total</b>: Rs.{order.total}</h6>
						<h6><b>date and time</b>: {order.date}</h6>
						<h6><b>Order</b>:</h6>
						{
							
							order.cart.map((item)=>{
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
		</Row>
		</Container>
		
		</>)
	}
	
export default User 
