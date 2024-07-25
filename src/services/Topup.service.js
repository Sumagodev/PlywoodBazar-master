import axios from 'axios';
import { axiosApiInstance } from '../../App';
import { url } from './url.service';

let serverUrl = `${url}/Topup`;

export const getAllTopup = async (query) => {
  return axiosApiInstance.get(`${serverUrl}/?${query}&perPage=${1500}`);
};
