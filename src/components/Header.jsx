import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'
import { Context, server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

function Header() {
   const {isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser}  = useContext(Context);

   const logoutHandler  = async(e)=>{
   try {
    setLoading(true);
    const {data} = await axios.get(`${server}/users/logout`,
      { 
        withCredentials:'true',
      });
    toast.success("logged Out successfully");
    setIsAuthenticated(false);
    setUser({});
    setLoading(false);
    
   } catch (error) {
    toast.error(error.response.data.message);
    setIsAuthenticated(true);
    setLoading(false);
   }

}
   

  return (
    <nav className='nav'>
        <div className="logo">
          Todo APP
        </div>
        <div className="right">
            <Link className='remove' to={'/'}>Home</Link>
            <Link className='remove' to={'/register'}>Register</Link>
            <Link className='remove' to={'/profile'}>Profile</Link>
            {
            isAuthenticated?<button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>:
            <Link className = 'remove' to={'/login'}>Login</Link>
            }
        </div>
    </nav>
  )
}

export default Header
