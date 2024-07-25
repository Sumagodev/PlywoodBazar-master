import axios from "axios";

import { url } from "./url.service";
import { getDecodedToken, getToken } from "./User.service";

const serverUrl = url + "/leads";


export const createLead = async (obj) => {
    let token = await getToken();
    console.log(token);
    let config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    return axios.post(`${serverUrl}/`, obj, config);
};


export const getLeadsBycreatedById = (id) => {
    return axios.get(`${serverUrl}/getLeadsBycreatedById/${id}`);
};

export const getLeadsById = (id) => {
    return axios.get(`${serverUrl}/getbyId/${id}`);
};
