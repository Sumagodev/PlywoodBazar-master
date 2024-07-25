import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/state`;


export const getStates = async (query) => {
    return axios.get(`${serverUrl}/?${query}`)
}
