import axios from "axios";
// //import { /*apiinstance*/ axios } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/advertisement`;


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


export const deleteAdvertisement = async (id) => {
    return /*apiinstance*/ axios.delete(`${serverUrl}/deleteById/${id}`)
}


export const updateAdvertisementApi = (formData, id) => {
    return /*apiinstance*/ axios.patch(`${serverUrl}/updateById/${id}`, formData)
}

