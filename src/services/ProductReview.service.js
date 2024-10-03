import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/productReview`;
let serverUrl1 = `${url}/vendorReview`;



export const addReview = async (obj) => {
    console.log('dipti',obj);
    
    return axios.post(`${serverUrl1}`, obj)
}
export const AddProductReview = async (obj) => {
    console.log('dipti',obj);
    
    return axios.post(`${serverUrl}`, obj)
}


export const getReviewForProduct = async (query) => {
    return axios.get(`${serverUrl1}/getReviewForVendors?${query}`)
}