
import{ Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import toast, { Toaster } from 'react-hot-toast'
import { useContext, useEffect } from 'react'
import { Context, server } from './main'
import axios from 'axios'

function App() {
  const { isAuthenticated,setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, [isAuthenticated]);


  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      <Toaster/>
    </Router>
    
        
        

  )
}

export default App
