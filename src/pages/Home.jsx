import React, { useContext, useEffect, useState } from 'react'
import '../styles/Home.css'
import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';


function Home() {
  const [title,setTitle] = useState()
  const [description,setDescription] = useState();
  const [loading,setLoading] = useState(false);
  const [tasks,setTasks] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const {isAuthenticated}  = useContext(Context);



  const submitHandler = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios
      .post(`${server}/task/new`,{
        title,
        description
      },{
        headers :{
          "Content-Type":'application/json'
        },
        withCredentials:'true',  
      });
      toast.success(data.messege);
      setLoading(false);
      setTitle("");
      setDescription("");
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.messege);
      setLoading(false);
    }

  }
  const updateTaskHandler = async(id) =>{
      try {
        const {data} = await axios.put(`${server}/task/${id}`,
        {},
        {
          withCredentials:true,
        }
        );
        toast.success(data.messege);
        setRefresh(prev=>!prev);

      } catch (error) {
        toast.error(error.response.data.messege)
      }
  }
  const deleteTaskHandler = async(id) =>{
      try {
        const {data} = await axios.delete(`${server}/task/${id}`,
        {
          withCredentials:true,
        }
        );
        toast.success(data.message);
        setRefresh(prev=>!prev);
      } catch (error) {
        toast.error(error.response.data.messege)
      }
  }

  useEffect(() => {
    axios
    .get(`${server}/task/my`,{
      withCredentials:true,
    }).then((res)=>{
      setTasks(res.data.tasks);
    }).catch((error)=>{
      toast.error(error.response.data.messege);
    })  
  }, [refresh]);

  if(!isAuthenticated){
    return <Navigate to={'/login'}/>
  }
  
  return (
    <>
    <div className='todo-page'>
    <form className='todo-form' onSubmit={submitHandler}> 
         <input 
                value={title}
                onChange={(e)=>setTitle(e.target.value)} 
                type="text" 
                placeholder='Add new Task'
                required
                />

         <input
                value={description} 
                onChange={(e)=>setDescription(e.target.value)} 
                type="textbox"
                placeholder='Add description'
                required
                />
         <button disabled={loading} type='submit'>ADD TASK</button>  
    </form>
  </div>
  <div className='todos'>
      {
        tasks.map(i=>(
          <TodoItem 
          title={i.title} 
          description={i.description}
          isCompleted = {i.isCompleted}
          updateTaskHandler={updateTaskHandler}
          deleteTaskHandler={deleteTaskHandler}
          key={i._id}
          id = {i._id}
           />
        ))
      }
    </div>
</>
  
  )
}

export default Home