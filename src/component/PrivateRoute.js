import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children,user}) => {
 
 if(! user?.data?._id){
   return <Navigate to='/login'/>
 }
 return children
}

export default PrivateRoute
