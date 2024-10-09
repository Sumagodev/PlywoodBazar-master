import axios from "axios";
import { url } from "./url.service";
let serverUrlProductReview = `${url}/productReview`;
let serverUrlVendorReview = `${url}/vendorReview`;



export const addReview = async (obj) => {    
    return axios.post(`${serverUrlVendorReview}`, obj)
}
export const addProductReview = async (obj) => {
    return axios.post(`${serverUrlProductReview}`, obj)
}


export const getReviewForProduct = async (query) => {
    return axios.get(`${serverUrlVendorReview}/getReviewForVendors?${query}`)
}

export const getReviewForProductNew = async (query) => {
    return axios.get(`${serverUrlProductReview}/getReviewForProduct?${query}`)
}

export const getReviewForVendors = async (query) => {
    console.log('yyyy',`${serverUrlVendorReview}/getReviewForVendors?${query}`)
    return axios.get(`${serverUrlVendorReview}/getReviewForVendors?${query}`)
}