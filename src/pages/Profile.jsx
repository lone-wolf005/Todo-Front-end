import React, { useContext } from 'react'
import { Context } from '../main';
import Loader from '../components/Loader';
import { Navigate } from 'react-router-dom';
import '../styles/Profile.css'

function About() {

  const {isAuthenticated,loading,user}  = useContext(Context);

  return (
   loading ? <Loader/> :(
    <div className='profile-page'>
      <div className="profile-container">
      <h3>Username : {user?.name}</h3>
      <h3> E-mail : {user?.email}</h3>
      </div>
    </div>
   )
  )
}

export default About