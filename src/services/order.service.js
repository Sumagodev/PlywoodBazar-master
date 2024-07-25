import axios from "axios";
//import { /*apiinstance*/ axios } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/order`;

export const createOrder = async () => {
  return await /*apiinstance*/ axios.post(`${serverUrl}/createOrder`);
};

export const orderCallback = async (obj, id) => {
  return await /*apiinstance*/ axios.get(`${serverUrl}/paymentCallback/${id}?${obj}`);
};

export const getOrderByUserId = async () => {
  return await /*apiinstance*/ axios.get(`${serverUrl}/getAllActiveOrdersByUserId`);
};

export const getOrderById = async (id) => {
  return await /*apiinstance*/ axios.get(`${serverUrl}/getOrderById/${id}`);
};
export const createCodOrder = async () => {
  return await /*apiinstance*/ axios.post(`${serverUrl}/createCodOrder`);
};
