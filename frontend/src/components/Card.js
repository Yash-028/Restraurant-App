import React,{useContext} from 'react';
import {ItemContext} from '../context/ItemContext.js'
import {Card,Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


const Cards=(props)=>{
	const [item,setItem]=useContext(ItemContext)
	const history=useHistory()
	const itemdetail=()=>{
			const itemdetail={
				...props
				}
			//console.log(itemdetail)
			setItem(itemdetail)
			history.push("/itemdetails")
		}
	
		return(<>
		<Card xs={12} className="m-1 p-0 mcard shadow-sm" style={{width:"30rem"}} onClick={itemdetail}>
		  <Card.Img variant="top" className="card-img img-fluid menucard" src={props.img_src} />
		  <Card.Body className="p-1" style={{display:"flex"}}>
			<p className="p-1"><b>{props.dishName}</b></p>
			<p className="card-rating p-1"><b>{props.rating}</b><FontAwesomeIcon icon={faStar} className="star"/ ></p>
		  </Card.Body>
		</Card>
		
		</>)
	}
export default Cards
