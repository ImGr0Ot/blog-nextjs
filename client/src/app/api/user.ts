import axios, { AxiosError } from "axios";

const BEUrl = process.env.API_URL || "http://localhost:4000";

export const registerRequest = async (user: any) => {
  try {
    const res = await axios.post(`${BEUrl}/register`, user);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginRequest = async (user: any) => {
  try {
    const res = await axios.post(`${BEUrl}/login`, user);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const logoutRequest = async (token: string) =>
  await axios.post(`${BEUrl}/logout`, token);

export const updateRequest = async (email: string, imgUrl: string) => {
  try {
    const res = await axios.put(`${BEUrl}/user/${email}`, { imgUrl: imgUrl });
    if (res.status !== 200) {
      throw new Error(JSON.stringify("Failed to update user"));
    }
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllUsers = async () => await axios.get(`${BEUrl}/users`);
