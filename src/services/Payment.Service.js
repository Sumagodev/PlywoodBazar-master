import {axiosApiInstance} from '../../App';
import {url} from './url.service';

let serverUrl = `${url}/payments`;

export const verifyPayment = async order_id => {
  try {
    const response = await axiosApiInstance.post(`${serverUrl}/verifyPayment`, {orderId: order_id});
    return response;
  } catch (error) {
    console.error('Error updating read status:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
};
