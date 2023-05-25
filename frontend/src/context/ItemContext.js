import React,{useState} from 'react';

export const ItemContext=React.createContext()

const ItemContextProvider=(props)=>{
		
		const [item,setItem]=useState()
		return(
			<ItemContext.Provider value={[item,setItem]}>
			{props.children}
			</ItemContext.Provider>
		)
	}
export default ItemContextProvider
