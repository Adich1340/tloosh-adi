import axios from "axios";
import { apiValidator } from "../utils/apiValidator";

const API = axios.create({
  baseURL: "http://localhost:8080/offers",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export type offerType = {
  id: number;
  name: string;
  price: string;
  description: string;
  timestamp: Date;
  affiliant: affiliantType;
};

export type affiliantType = {
  id: number;
  name: string;
  link: string;
};

const getAllOffers = async (id: number): Promise<offerType[] | false> => {
  try {
    const response = await API.get(`/get-offers/${id}`, {});

    apiValidator.validateStatus(response, 200);

    return response.data;
  } catch (e) {
    return false;
  }
};

const hideOffer = async (userId: number, offerId: number): Promise<boolean> => {
  try {
    const body = { userId, offerId };
    const response = await API.post("/hide-offer", body);
    apiValidator.validateStatus(response, 201);

    return response.data;
  } catch (e) {
    return false;
  }
};

const hideAffiliant = async (
  userId: number,
  affiliantId: number
): Promise<boolean> => {
  try {
    const body = { userId, affiliantId };
    const response = await API.post("/hide-affiliant", body);
    apiValidator.validateStatus(response, 201);

    return response.data;
  } catch (e) {
    return false;
  }
};

export const offersService = {
  getAllOffers,
  hideOffer,
  hideAffiliant,
};
