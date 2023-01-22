import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import { Spinner } from "flowbite-react";
import { useParams } from "react-router-dom";
import { API } from "../../api";

const TaskUpdate = () => {
  const taskId = useParams().taskId;
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get(`/api/tasks/task/${taskId}`).then((data) => {
      setTask(data);
      setIsLoading(false);
    });
  });

  return <div>{isLoading ? <Spinner /> : <TaskForm task={task} />}</div>;
};

export default TaskUpdate;
