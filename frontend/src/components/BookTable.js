import React,{useState} from 'react';
import {Container} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import emailjs from 'emailjs-com'


const BookTable=()=>{
	const history=useHistory()
	const [reservation,setReservation]=useState({
			reservee:"",
			contact:undefined,
			guests:0,
			date:undefined,
			time:undefined
		})
	let name,value
	const inputHandle=(e)=>{
			name=e.target.name
			value=e.target.value
			setReservation({...reservation,[name]:value})
		}
	const postData=async (e)=>{
			e.preventDefault()
		//	console.log(reservation)
			const res=await	fetch("/booktable",{
						method:"POST",
						headers:{"Content-Type":"application/json"},
						body:JSON.stringify(
						reservation
					)
				})
			const userData=await res.json();
			if(res.status!==201||!userData){
					window.alert("booking unsuccessful")
				}else{
					
					//const mailRes=await	fetch("/send",{
									//method:"POST",
									//headers:{"Content-Type":"application/json"},
									//body:JSON.stringify(
									//reservation
								//)
							//})
						//const mailData=await mailRes.json();
						//if(res.status!==201||!userData){
								//window.alert("mail not sent")}else{
										//window.alert("mail sent")
									//}
					window.alert("Booking Request Received. we will send the confirmation on the contacts shared by you!!")
					
					
					setReservation({
			reservee:"",
			guests:0,
			contact:0,
			date:"",
			time:""
				})
					//window.alert("booking success! we will send a confirmation on your contact details!")
					history.push("/")				
			}
		}
	function sendEmail(e) {
    e.preventDefault();
	//console.log("here")
    emailjs.sendForm('service_hbsmmu5', 'template_0n9obhm', e.target, process.env.REACT_APP_USER_KEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      postData(e)
  }
	return(<>
	<Container className="justify-content-center">
	<h2 className="text-center my-3">Table Reservation</h2>
	<Container className="form-container shadow">
	<form method="POST" className="p-3 my-3" onSubmit={sendEmail}>
	  <div className="mb-3">
		<label htmlFor="reservee" className="form-label">Name of the reservee</label><span className="compulsory">*</span>
		<input type="text" defaultValue={reservation.reservee} name="reservee" onChange={inputHandle} className="form-control" />
	</div>
	 <div className="mb-3">
		<label htmlFor="reservee" className="form-label">Contact no.</label><span className="compulsory">*</span>
		<input type="tel" defaultValue={reservation.contact} name="contact" onChange={inputHandle} className="form-control" />
	</div>
	  <div className="mb-3">
		<label htmlFor="guests" className="form-label">No. of guests</label><span className="compulsory">*</span>
		<input type="number" defaultValue={reservation.guests} name="guests" onChange={inputHandle} className="form-control"/>
	  </div>
	  <div className="mb-3">
		<label htmlFor="guests" className="form-label">Date of reservation(dd/mm/yy)</label><span className="compulsory">*</span>
		<input type="date" defaultValue={reservation.date} name="date" onChange={inputHandle} className="form-control"/>
	  </div>
	  <div className="mb-3">
		<label htmlFor="guests" className="form-label">Time of reservation</label><span className="compulsory">*</span>
		<input type="time" defaultValue={reservation.time} name="time" onChange={inputHandle} className="form-control"/>
	  </div>
	  <button type="submit" className="btn btn-success form-btn btn-lg">Submit</button>
	</form>
	</Container>
	</Container>
	</>)
	
	}
	
export default BookTable
