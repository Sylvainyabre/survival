import React, { useState, useEffect } from "react";
import Task from "./Task";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

      <hr />
      {isLoading ? <Spinner /> : displayTasks}
    </div>
  );
};

export default Tasks;
