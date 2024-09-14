import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/state`;
let serverUrl1 = `${url}/stateDetail`;
 

export const getStates = async (query) => {
    return axios.get(`${serverUrl}/?${query}`)
}
export const stateDetails = async () => {
    return axios.get(`${serverUrl1}/stateDetails`)
}
