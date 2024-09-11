// local url
// export const url = 'http://192.168.0.37:3016';
// export const adminUrl = 'http://192.168.0.37:3016';

// production url
export const url = "http://13.232.176.232/api";
// export const url = "https://api.plywoodbazar.com";
// export const adminUrl = "http://localhost:3000";
// export const adminUrl = "http://192.168.0.4:3016";

export const generateImageUrl = path => {
  return `${url}/uploads/${path}`;
};
