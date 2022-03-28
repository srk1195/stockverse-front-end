import axios from 'axios';
import CONSTANTS from './constants';

const API = axios.create({ baseURL: CONSTANTS.LOCAL_BACKEND_URL });

/* export const performLogin = (loginData) => API.post('/users/login', loginData); */

export const addWishlist = (wishlistData) => API.post('/wishlist/', wishlistData);
export const getUserWishlist = (UserId) => API.get(`/wishlist/${UserId}`);
export const getWishlistById = (wishlistId) => API.get(`/wishlist/${wishlistId}`);
export const updateWishlistById = (wishlistId,wishlistData) => API.put(`/wishlist/${wishlistId}`, wishlistData); 
export const deleteWishlistById = (wishlistId) => API.delete(`/wishlist/${wishlistId}`);
/* export const getAllUsers = () => API.get('/users');

export const getUserProfile = (UserId) => API.get(`/users/${UserId}`);

*/