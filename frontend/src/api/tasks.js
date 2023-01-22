import {API} from "./index"
export const createTask = async(data)=>{
    try {
    const res = await API.post(`api/tasks/task/new`, data);
    return res
  } catch (err) {
    return err;
  }
}

export const updateTask = async(taskId,data)=>{
    try {
    const res = await API.post(`api/tasks/task/${taskId}`, data);
    return res
  } catch (err) {
    return err;
  }
    
}

export const DeleteTask = async(taskId,data)=>{
     try {
    const res = await API.post(`api/tasks/task/${taskId}`, data);
    return res
  } catch (err) {
    return err;
  }
    
}