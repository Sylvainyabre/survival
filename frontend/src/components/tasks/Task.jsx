import React,{useState} from "react";
import { Accordion,Button } from "flowbite-react";
import { Link } from "react-router-dom";
import LiveModal from "./LiveModal";
import TextModal from "./TextModal";

const Task = ({ task }) => {
  const [showLive,setShowLive] = useState(false)
  const [showTextBox,setShowTextBox] = useState(false)
  const handleLive = ()=>{

  }
  const handleSend  =()=>{

  }
  const handleDelete = ()=>{
    
  }
  return (
    <>
      <Accordion alwaysOpen={true}>
        <Accordion.Panel>
          <Accordion.Title><p className="flex">{task.title} <span className="p-10">{task.status}</span></p></Accordion.Title>
          <Accordion.Content>
            <div className="flex">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {task.description}
              </p>
              <hr/>
              <LiveModal showLive={showLive} setShowLive={setShowLive} handleLive={handleLive}/>
              <TextModal showTextBox={showTextBox} setShowTextBox={setShowTextBox} handleSend={handleSend}/>
              <div className="flex inline">
                 <Link to={`/tasks/task/update/${task._id}`}>Update Task</Link>
                 <Button onClick={()=>setShowTextBox(true)}>Text Partner</Button>
                 <Button onClick={()=>setShowLive(true)}>Start Live</Button>
                <Button onClick={()=>handleDelete()}>Start Live</Button>
              </div>
          
             
            </div>
           
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </>
  );
};

export default Task;
