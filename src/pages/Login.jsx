import React, { useContext, useState } from 'react'
import '../styles/Login.css'
import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

function Login() {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}  = useContext(Context);

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")


const submitHandler  = async(e)=>{
      e.preventDefault();
      setLoading(true);
     try {
      const {data} = await axios.post(`${server}/users/login`,
      {
        email,password 
      },
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
    <div className='login-page'>
    <form className='login-form' onSubmit={submitHandler}> 
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
                // autoComplete='true'
                required
                />
         <button disabled={loading} type='submit'>Sign In</button>
        
    </form>
  </div>
  )
}

export default Login