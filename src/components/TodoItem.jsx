import React from 'react'
import '../styles/TodoItem.css'

function TodoItem({title,description,isCompleted,updateTaskHandler,deleteTaskHandler,id}) {
  return (
    <div className="main-container">
    <div className="container">
         <div className='todo'>
            <h2>{title}</h2>
            <p>{description}</p>
         </div>
         <div className='update'>
            <input onChange={()=>updateTaskHandler(id)} type="checkbox" value={isCompleted} />
            <button onClick={()=>deleteTaskHandler(id)}>Delete</button>
         </div>
    </div>
    </div>
  )
}

export default TodoItem