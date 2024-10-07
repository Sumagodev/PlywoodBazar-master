import axios from 'axios';
import { url } from './url.service';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosApiInstance } from '../../App';
let serverUrl = `${url}/users`;
let notificationURL = `${url}/notifications`;

export const registerUser = async obj => {
  return axios.post(`${serverUrl}/register/`, obj);
};

export const loginUser = async obj => {
  return axios.post(`${serverUrl}/app-login/`, obj);
};

export const verifyUserOTP = async obj => {
  return axios.post(`${serverUrl}/verifyUserOTP/`, obj);
};

export const sentOtp = async obj => {
  console.log("sdfbsdfgasdhasdhfsadfhsgadjhasgfjhasdfgfgjfgafgasfasdgasd", obj)

  return axios.post(`${serverUrl}/sentOtp/`, obj);
};
export const sendOtpService = async obj => {
  console.log("sdfbsdfgasdhasdhfsadfhsgadjhasgfjhasdfgfgjfgafgasfasdgasd", obj)

  return axios.post(`${serverUrl}/sentOtp/`, obj);
};
export const sendOtpForVerification = async obj => {
  return axios.post(`${serverUrl}/sendOTPForVerify/`, obj);
};
export const checkIfUserIsVerified = async obj => {
  return axios.post(`${serverUrl}/checkIfUserIsVerified/`, obj);
};
export const getAllUsers = async (query, source) => {
  return axios.get(`${serverUrl}/getAllUsersForWebsite/?${query}`, { cancelToken: source?.token })
}
export const checkForValidSubscriptionAndReturnBoolean = async (id) => {
  return axios.get(`${serverUrl}/checkForValidSubscriptionAndReturnBoolean/${id}`);
}
export const topProfilesHomePage = async () => {
  return axios.get(`${serverUrl}/getTopVendors`);
}

export const otpLogin = async obj => {
  return axios.post(`${serverUrl}/app-login/`, obj);
};
export const getUserById = async id => {
  let decoded = await getDecodedToken();
  return /*apiinstance*/ axiosApiInstance.get(`${serverUrl}/getUserById/${decoded?.userId}`);
};
export const getUserUserById = async (id) => {
   let decoded = await getDecodedToken();
  // return /*apiinstance*/ axiosApiInstance.get(`${serverUrl}/getUserById/${id}`);
  return axiosApiInstance.get(`${serverUrl}/getUserById/${id}?visitorUserId=${decoded?.userId}`);

};

// export const getUserNotifications = async (obj) => {
//   return await axiosApiInstance.get(`${serverUrl}/getUserNotifications${obj}`)
// }
export const getUserNotifications = async (obj) => {
  console.log('hello',obj)
  return await axiosApiInstance.post(`${notificationURL}/getAllNotifications`,obj)
}

export const deleteUserByID = async (id) => {
  return await axiosApiInstance.delete(`${serverUrl}/deleteUserById/${id}`)
}



export const searchVendorFromDb = async (query) => {
  return axiosApiInstance.get(`${serverUrl}/searchVendor?${query}`)
}

export const updateUserById = async (id, obj) => {
  return axiosApiInstance.patch(`${serverUrl}/updateUserById/${id}`, obj);
};

export const setToken = async token => {
  await AsyncStorage.setItem('AUTH_TOKEN', token);
  return true;
};

export const getToken = async token => {

  return await AsyncStorage.getItem('AUTH_TOKEN');
  // return true;
};

export const getDecodedToken = async () => {
  let token = await AsyncStorage.getItem('AUTH_TOKEN');
  console.log(token)
  if (!token) {
    return null;
  }
  let decodedToken = jwt_decode(token);
  return decodedToken;
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('AUTH_TOKEN');
};

export const AddReview = async obj => {
  return /*apiinstance*/ axios.post(`${url}/productReview/`, obj);
};

export const refreshToken = async obj => {
  return axios.post(`${serverUrl}/refreshToken`, obj);
};
