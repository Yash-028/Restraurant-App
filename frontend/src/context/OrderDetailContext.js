import React,{useState} from 'react';

export const OrderDetailContext=React.createContext()

const OrderDetailContextProvider=(props)=>{
		
		const [odetail,setOdetail]=useState({})
		return(
			<OrderDetailContext.Provider value={[odetail,setOdetail]}>
			{props.children}
			</OrderDetailContext.Provider>
		)
	}
export default OrderDetailContextProvider
