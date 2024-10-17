import axios from 'axios';
import { axiosApiInstance } from '../../App';
//import { /*apiinstance*/ axios } from "../App";
import { url } from './url.service';
import { getDecodedToken } from './User.service';

let serverUrl = `${url}/product`;
let serverUrl1 = `${url}//users`;

export const AddProduct = async obj => {
  return /*apiinstance*/ axiosApiInstance.post(`${serverUrl}/`, obj);
};

// export const getAllProducts = async query => 
//   {
//   console.log(query, 'query');
//   return /*apiinstance*/ axios.get(`${serverUrl}/searchProductWithQuery/?${query}`);
// };
export const getAllProducts = async query => 
  {
  console.log(query, 'query');
  return /*apiinstance*/ axios.get(`${serverUrl}/?${query}`);
};

// export const getProductById = async id => {
//   return /*apiinstance*/ axios.get(`${serverUrl}/getProductById/${id}`);
// };

export const getProductById = async id => {
  let decoded = await getDecodedToken();

  return /*apiinstance*/ axiosApiInstance.get(`${serverUrl}/getProductById/${id}?visitorUserId=${decoded?.userId}`);
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
// export const getSimilarProducts = async id => {
//   return axiosApiInstance.get(`${serverUrl}/getSimilarProducts/${id}`);
// };

export const searchProduct = async (query) => {
  return axiosApiInstance.get(`${serverUrl}/searchProductWithQuery?name=${query}`);
};
export const searchHomeProduct = async (query) => {
  return axiosApiInstance.get(`${serverUrl1}/searchVendor?search=${query}`);
};

export const deleteById=async(id)=>{
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`)
}
export const getProductYouMayLike=async()=>{
  return axiosApiInstance.get(`${serverUrl}/getProductYouMayLike`)
}