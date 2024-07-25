import axios from 'axios';
import {axiosApiInstance} from '../../App';
//import { /*apiinstance*/ axios } from "../App";
import {url} from './url.service';

let serverUrl = `${url}/flashSales`;

export const createFlashSales = async obj => {
  return /*apiinstance*/ axios.post(`${serverUrl}/`, obj);
};

export const getAllFlashSales = async (query) => {
  return /*apiinstance*/ axios.get(`${serverUrl}/getFlashSales?${query}`);
};

export const getAllFlashSalesbyUserId = async id => {
  return axiosApiInstance.get(`${serverUrl}/getFlashSalesByUserId/${id}`);
};

export const getFlashSalebyId = async id => {
  return /*apiinstance*/ axios.get(`${serverUrl}/getById/${id}`);
};

export const updateFlashSalebyId = async (id, obj) => {
  return /*apiinstance*/ axios.patch(`${serverUrl}/updateById/${id}`, obj);
};

export const deleteFlashSalebyId = async id => {
  return /*apiinstance*/ axios.delete(`${serverUrl}/deleteById/${id}`);
};
