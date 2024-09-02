import axios from "axios";
import { apiValidator } from "../utils/apiValidator";

const API = axios.create({
  baseURL: "http://localhost:8080/tracker",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const trackAction = async (
  userId: number,
  elementId: string
): Promise<any> => {
  try {
    const body: any = { userId, elementId };
    const response = await API.post("/track-action", body);
    apiValidator.validateStatus(response, 201);

    return response.data;
  } catch (e) {
    return false;
  }
};



export const trackerService = {
    trackAction
};
