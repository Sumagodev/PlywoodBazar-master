//import { /*apiinstance*/ axios } from "../App";
import {axiosApiInstance} from '../../App';
import {url} from './url.service';

let serverUrl = `${url}/userRequirement`;

export const addUserRequirement = async obj => {
  console.log(obj, 'object');
  return axiosApiInstance.post(`${serverUrl}/addUserRequirement`, obj);
};
