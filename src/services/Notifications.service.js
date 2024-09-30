import { axiosApiInstance } from '../../App';
import { url } from "./url.service";

let serverUrl = `${url}/notifications`;

export const updateReadStatus = async (notificationId, userId) => {
    // try {
    //     const response = await axiosApiInstance.post(`${serverUrl}/updateReadStatus`, { // Add 'await' here
    //         notificationId,
    //         userId
    //     });
    // } catch (error) {
    //     console.error('Error updating read status:', error);
    //     throw error; // Rethrow the error for handling in the calling function
    // }
};
