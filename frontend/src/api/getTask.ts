import axios from "@/config/axios";
import { TaskFromDB } from "@/interface";

export const getTask = async (taskId: string) => {
  const url = `/tasks/${taskId}`;

  try {
    const { data } = await axios(url);

    return data as TaskFromDB;
  } catch (error) {
    return undefined
  }
};
