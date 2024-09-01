import React from 'react'
import { Link } from 'react-router-dom'

const notfound = () => {
  return (
    <div style={{display:"flex", alignItems:'center',justifyContent:'center', height:"100vh", fontSize:'40px'}}>
        404 page go  {"- "}
        <Link to={"/home"}> {" "} home</Link> 
        </div>
  )
}

export default notfound