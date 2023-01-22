import React, { useState, useEffect } from "react";
import Task from "./Task";
import { Spinner,Select } from "flowbite-react";
import { Link } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [day,setDay] = useState("None")
  useEffect(() => {
    fetch("/api/tasks/all")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setIsLoading(false);
        setTasks(data)})
        
        
  });
  useEffect(()=>{
    let dayTasks = tasks?.filter((task)=> task.doOnDay===day)
    setTasks(dayTasks)

  },[day,tasks])
  const displayTasks = tasks.map((task) => <Task task={task} key={task._id} />);
  return (
    <div className={"mt-5 relative w-11/12 m-auto block text-center"}>
      <Link
        className={
          "w-40 h-12 m-auto text-white bg-blue-800 rounded-xl relative font-sans mb-4 block text-center pt-3"
        }
        to={"/tasks/task/new"}
      >
        +ADD ARTICLE
      </Link>
         <div id="select">
            <Select
              id="doOnDay"
              required={true}
              onChange={(e) => setDay(e.target.value)}
            >
              <option>Sunday</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
            </Select>
          </div>
      <hr />
      {isLoading ? <Spinner /> : displayTasks}
    </div>
  );
};

export default Tasks;
