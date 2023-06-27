import React, { useEffect, useState } from 'react';
import {user} from "../Join/Join";
import './Chat.css';
import sendLogo from "../../images/send.png"
import socketIO from 'socket.io-client';
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png"

const ENDPOINT = "https://chat-app-kob7.onrender.com/";
let socket;

function Chat() {

    const [id, setid] = useState("");

    const [messages, setMessage] = useState([]);

    const send = ()=>{
        const message = document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value="";

    }
   
    useEffect(() => {
         socket = socketIO(ENDPOINT,{transports:['websocket']});

        socket.on('connect',()=>{
            alert("Connceted");
            setid(socket.id);
    
        })

        socket.emit('joined',{user})

        socket.on('welcome',(data)=>{
            setMessage([...messages,data]);
            console.log(data.user,data.message);
        })

        socket.on('userJoined',(data)=>{
            setMessage([...messages,data]);
            console.log(data.user,data.message);
        })

        socket.on('leave',(data)=>{
            setMessage([...messages,data]);
            console.log(data.user,data.message);
        })

        return () => {
            socket.disconnect();
            socket.off();
        }

    }, []);

    useEffect(() => {
      socket.on('sendMessage',(data)=>{
        setMessage([...messages,data]);
        console.log(data.user,data.message,data.id);
      })
    
      return () => {
        socket.off();
      }
    }, [messages])
    
    
   console.log(messages);
  return (
    <div className='ChatPage'>
        <div className='ChatContainer'>

        <div className='header'>
            <h2>Me Chat</h2>
           <a href="/"><img src={closeIcon} alt="close icon" /></a> 
        </div>    
        <ReactScrollToBottom className='ChatBox'>
           {messages.map((item,i)=>{
            return <Message user = {item.id === id?"":item.user} message={item.message} classs= {item.id === id?"right":"left"}/>
           })}
        </ReactScrollToBottom>
        <div className='inputBox'>
            <input onKeyDown={(event)=>
                event.key === 'Enter'?send():null
            } type="text" id='chatInput' />
            <button onClick={send} className='sendBtn'><img src={sendLogo} alt="send logo" /></button>
            </div>
        </div>
    </div>
   
  )
}

export default Chat