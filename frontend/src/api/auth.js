import { API } from "./index";

const loginUrl = "/api/auth/login";

export const userLogin = async ({ email, password }) => {
  try {
    const res = await API.post(loginUrl, { email, password });
    const responseData = res?.data;
    return responseData;
  } catch (err) {
    return err;
  }
};

const registrationUrl = "/api/auth/register";
export const RegisterUser = async (data) => {
  try {
    const res=await API.post(registrationUrl, data);
    return res;
  } catch (err) {
    return err;
  }
};
export const invite = async (userId) => {
  try {
    const res = await API.post(`api/auth/invite/${userId}`, {});
    return res
  } catch (err) {
    return err;
  }
};

export const accept = async(userId) => {
    try {
    const res = await API.post(`api/auth/accept/${userId}`, {});
    return res
  } catch (err) {
    return err;
  }
};
