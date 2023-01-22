import React from "react";
import { Accordion } from "flowbite-react";
import { Link } from "react-router-dom";

const Task = ({ task }) => {
  const handleClick = () => {};
  return (
    <>
      <Accordion alwaysOpen={true}>
        <Accordion.Panel>
          <Accordion.Title>{task.title}</Accordion.Title>
          <Accordion.Content>
            <div className="flex">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {task.description}
              </p>
              <span>{task.status}</span>
            </div>

            <Link to={`/tasks/task/${task._id}`}>Update</Link>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </>
  );
};

export default Task;
