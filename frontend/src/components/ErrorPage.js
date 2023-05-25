import React from 'react';
import {Button,Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const ErrorPage=()=>{
		return(<>
		<Container className="err-container">
			<p className="text-muted text-center"><FontAwesomeIcon icon={faExclamationTriangle} size="10x"/></p>
			<h1 className="text-muted text-center err-text">Page not Found</h1>
			<Button variant="secondary" className="go-home text-center btn-lg"><NavLink to="/" style={{color:"white",textDecoration:"none"}}>Home</NavLink></Button>
		</Container>
		</>)
	}

export default ErrorPage;
