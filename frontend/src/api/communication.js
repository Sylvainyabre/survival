import { API } from "./index";
export const sendMessage = async(userId)=>{
    try {
    const res = await API.post(`api/communication/sendMessage/${userId}`, {});
    return res
  } catch (err) {
    return err;
  }
}

export const sendEmail = async(userId)=>{
    try {
    const res = await API.post(`api/communication/sendMessage/${userId}`, {});
    return res
  } catch (err) {
    return err;
  }
}