import axios from "axios";
// //import { /*apiinstance*/ axios } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/advertisement`;
let serverUrl1 = `${url}/dealershipOwnerRoutes`;
let serverUrl2 = `${url}/dealershipUSerRoutes`;


export const AddAdvertisement = async (obj) => {
    return /*apiinstance*/ axios.post(`${serverUrl}/`, obj)
}
 
export const getAllAdvertisements = async (query) => {
    return /*apiinstance*/ axios.get(`${serverUrl}/?userId=${query}`)
}
export const getForHomepage = async (query) => {
    return /*apiinstance*/ axios.get(`${serverUrl}/getForHomepage?${query}`)
}



export const getAdvertisementById = async (id) => {
    return /*apiinstance*/ axios.get(`${serverUrl}/getById/${id}`)
}
export const AddDealershipOpportunities = async (obj) => {
    

    return axios.post(`${serverUrl1}/addDealershipOpportunity/`, obj)
}
export const ApplyForDealershipOpportunitiy = async (obj) => {
    return /*apiinstance*/ axios.post(`${serverUrl2}/applyForDealershipOpportunitiy`, obj)
}
export const GetDealershipOpportunities = async () => {
 
    return /*apiinstance*/ axios.get(`${serverUrl1}/getDelearshipOpportunities`)
}
export const GetDealershiplist = async (id) => {
 console.log('dataaaa',id);
 
    return /*apiinstance*/ axios.get(`${serverUrl1}/getDealershipOwnerByUserId/${id}`)
}
export const GetAppliedlist = async (id) => {
 console.log('dataaaa',id);
 
    return /*apiinstance*/ axios.get(`${serverUrl2}/getDealershipApplicationByUserId/${id}`)
}
export const DeleteOpp = async (id) => {
 console.log('dataaaa',id);
 
    return /*apiinstance*/ axios.delete(`${serverUrl1}/dealership-owners/${id}`)
}
export const Updateopp = async (obj,id) => {
 console.log('updatee',id);
 
    return /*apiinstance*/ axios.put(`${serverUrl1}/dealership-owners/${id}`,obj)
}


export const deleteAdvertisement = async (id) => {
    return /*apiinstance*/ axios.delete(`${serverUrl}/deleteById/${id}`)
}


export const updateAdvertisementApi = (formData, id) => {
    return /*apiinstance*/ axios.patch(`${serverUrl}/updateById/${id}`, formData)
}

