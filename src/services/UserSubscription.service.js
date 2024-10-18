import axios from 'axios';
import {axiosApiInstance} from '../../App';
//import { /*apiinstance*/ axios } from "../App";
import {url} from './url.service';

let serverUrl = `${url}/usersubscription`;

export const buySubscription = async obj => {
  return axiosApiInstance.post(`${serverUrl}/buySubscription`, obj);
};

export const getAllSubscriptionbyUserId = async () => {
  return axiosApiInstance.get(`${serverUrl}/getAllSubscriptionbyUserId`);
};

export const usersubscriptionMailId = async (id) => {
  return axios.get(`${serverUrl}/sendMailById/${id}`)
}

export const initiateJuspayPaymentForSubcription = async (dataObject) => {
  return axios.post(`${serverUrl}/initiateJuspayPaymentForSubcription/${id}`,{dataObject})
}
