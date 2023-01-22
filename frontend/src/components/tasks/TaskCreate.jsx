import React from 'react';
import NavBar from '../../navBar';
import TaskForm from './TaskForm';


const TaskCreate = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="w-4/5 items-center justify-center m-auto">
      <TaskForm/>
      </div>
    </div>
  )
}

export default TaskCreate