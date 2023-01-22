import React,{useState} from 'react'
import {Label,Textarea,TextInput,Button,Select} from 'flowbite-react'

const TaskForm = ({task,isLoading}) => {
    const [title,setTitle] = useState(null)
    const [description,setDescription] = useState(null)
    const [status,setStatus] = useState(null)
    const [doOnDay,setDoOnDay] = useState(null)
    const [category,setCategory] = useState(null)
    const handleSubmit = ()=>{
        let newTask = {
            title:task?.title?task.title:title,
            description:task?.description?task.description:description,
            status:task?.status?task.status:status,
            doOnDay:task?.doOnDay?task.doOnDay:doOnDay,
            category:task?.category?task.category:category
            
            
        }
        if(newTask.status==="Inprogress"){
            newTask = {...newTask, startDate:new Date().toLocaleDateString()}

        }else if(newTask.status==="Completed"){
             newTask = {...newTask, endDate:new Date().toLocaleDateString()}

        }
        

    }
    
  return (
<>
      <form onSubmit={handleSubmit}>
        <div className="mb-5 block">
          <div className="mb-2 block text-8xl">
            <Label
              htmlFor="title"
              value="Title"
              className={"font-medium text-lg"}
            />
          </div>
          <div id="textinput">
            {" "}
            <TextInput
              id="title"
              placeholder="Title of the task"
              defaultValue={task ? task.title : ""}
              required={true}
              rows={4}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mb-5 block">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Task description" />
          </div>
          <div id="textarea">
            <Textarea
              id="description"
              placeholder="Description of your task"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={task ? task.description : ""}
              required={true}
              rows={4}
            />
          </div>
        </div>

        <div id="select" className="mb-5 block">
          <div className="mb-2 block">
            <Label htmlFor="status" value="Article status" />
          </div>
          <div id="select">
            <Select
              id="status"
              required={true}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>created</option>
              <option>Inprogress</option>
              <option>Completed</option>
            </Select>
          </div>
        </div>
        <div className="mb-5 block">
          <div className="mb-2 block">
            <Label htmlFor="start" value="Task Start D" />
          </div>
        </div>
        <div className="mb-5 block">
          <div className="mb-2 block">
            <Label htmlFor="doOnDay" value="Due day of this task" />
          </div>
          <div id="select">
            <Select
              id="doOnDay"
              required={true}
              onChange={(e) => setDoOnDay(e.target.value)}
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
        </div>
        <div className="mb-5 block">
          <div className="mb-2 block">
            <Label htmlFor="category" value="Task category" />
          </div>
          <div id="select">
            <Select
              id="category"
              required={true}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Break</option>
              <option>Assignment</option>
              <option>Course review</option>
              <option>Quizz</option>
              <option>Exam</option>
            </Select>
          </div>
        </div>
        <Button
          color="info"
          type="submit"
          disabled={isLoading}
          className={"text-base uppercase mb-64"}
        >
          Submit
        </Button>
      </form>
    </>
  )
}

export default TaskForm