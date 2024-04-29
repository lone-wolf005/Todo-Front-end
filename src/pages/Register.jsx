import React, { useContext, useState } from 'react'
import '../styles/Register.css'
import axios from 'axios'
import { Context, server } from '../main'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

function Register() {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}  = useContext(Context);
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")


const submitHandler  = async(e)=>{
      e.preventDefault();
      setLoading(true);
     try {
      const {data} = await axios.post(`${server}/users/new`,
      {
        name,email,password },
        {
        headers :{
          "Content-Type":'application/json'
        },
        withCredentials:'true',
      });
      toast.success(data.messege);
      setIsAuthenticated(true);
      setLoading(false);
      
     } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
     }
  
  }
  if(isAuthenticated){
    return <Navigate to={'/'}/>
  }
  return (
    <div className='register-page'>
      <form className='register-form'  onSubmit={submitHandler}>
         <input 
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                type="text" 
                placeholder='name'
                required
                />

          
         <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                type="email" 
                placeholder='Email'
                required
                />

         <input
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
                type="password"
                placeholder='Password'
                required
                />

         <button disabled={loading} type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default Register