import axios from "axios";
// //import { /*apiinstance*/ axios } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/advertisement`;
let serverUrl1 = `${url}/dealershipOwnerRoutes`;


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
    // return /*apiinstance*/ axios.post(`https://webhook.site/239d7bbd-6c40-4fbe-bfa8-07944952c09f`,obj)
    return /*apiinstance*/ axios.post(`${serverUrl1}/dealership-owners/${obj}`)
}
export const GetDealershipOpportunities = async () => {
 
    return /*apiinstance*/ axios.get(`${serverUrl1}/dealership-owners`)
}


export const deleteAdvertisement = async (id) => {
    return /*apiinstance*/ axios.delete(`${serverUrl}/deleteById/${id}`)
}


export const updateAdvertisementApi = (formData, id) => {
    return /*apiinstance*/ axios.patch(`${serverUrl}/updateById/${id}`, formData)
}

