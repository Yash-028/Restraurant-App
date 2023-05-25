import React,{useState} from 'react';

export const UserContext=React.createContext()

const UserContextProvider=(props)=>{
		const [user,setUser]=useState({})
		return(
			<UserContext.Provider value={[user,setUser]}>
			{props.children}
			</UserContext.Provider>
		)
	}
export default UserContextProvider
