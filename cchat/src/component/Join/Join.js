import React, { useState } from 'react';
import "./Join.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";

let user;

function Join() {
  const [name,setName] = useState("");
 
  const sendUser = ()=>{
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
  }
  return (
    <div className='joinPage'>
        <div className='joinContainer'>
        <img src={logo} alt="chat app logo" />
            <h1>ME CHAT</h1>
            <input onChange={(e)=>{setName(e.target.value)}} type="text" id="joinInput" placeholder='Enter Your Name' />
           <Link onClick={(e)=>!name&&e.preventDefault()} to="/chat"> <button onClick={sendUser} className='joinButton'>Log in</button></Link>
        </div>
    </div>
    
  )
}

export default Join;
export {user};

