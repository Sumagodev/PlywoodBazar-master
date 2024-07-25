import axios from 'axios';
import { axiosApiInstance } from '../../App';
//import { /*apiinstance*/ axios } from "../App";
import { url } from './url.service';

let serverUrl = `${url}/product`;

export const AddProduct = async obj => {
  return /*apiinstance*/ axiosApiInstance.post(`${serverUrl}/`, obj);
};

export const getAllProducts = async query => {
  console.log(query, 'query');
  return /*apiinstance*/ axios.get(`${serverUrl}/?${query}`);
};

export const getProductById = async id => {
  return /*apiinstance*/ axios.get(`${serverUrl}/getProductById/${id}`);
};



export const getById = async id => {
  return axiosApiInstance.get(`${serverUrl}/getById/${id}`);
};




export const getAllProductsBySupplierId = async (id) => {
  return axios.get(`${serverUrl}/getAllProductsBySupplierId/${id}`);
};

export const getProductReviews = async query => {
  return /*apiinstance*/ axios.get(`${serverUrl}/getReviewOfProduct?${query}`);
};

export const updateProductApi = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateAppById/${id}`, formData);
};

export const getSimilarProducts = async id => {
  return axiosApiInstance.get(`${serverUrl}/getSimilarProducts/${id}`);
};

export const searchProduct = async (query) => {
  return axiosApiInstance.get(`${serverUrl}/searchProductWithQuery?name=${query}`);
};

export const deleteById=async(id)=>{
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`)
}