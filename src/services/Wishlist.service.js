//import { /*apiinstance*/ axios } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/wishlist`;

export const getWishList = async () => {
    return /*apiinstance*/ axios.get(`${serverUrl}/getWishlist`)
}

export const AddToWishlist = async (obj) => {
    return /*apiinstance*/ axios.post(`${serverUrl}/AddToWishlist`, obj)
}

export const RemoveItemFromWishlist = async (obj) => {
    return /*apiinstance*/ axios.post(`${serverUrl}/RemoveItemFromWishlist`, obj)
}
