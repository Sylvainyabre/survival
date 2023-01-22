import React,{useState,useEffect} from 'react';
import Task from './Task';
import { Spinner } from 'flowbite-react';

const Tasks = () => {
    const [tasks,setTasks] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
        fetch("/api/tasks/all")
        .then((res)=>{
            if(res.ok){
                res.json()
            }
            throw res
        })
        .then((data)=>setTasks(data));
    })
    const displayTasks = tasks.map((task)=><Task task={task} key={task._id}/>)
  return (
   <div>
   { isLoading?<Spinner/>:displayTasks}

   </div>
  )
}

export default Tasks