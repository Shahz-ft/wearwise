import axiosConfig from "./AxiosConfig";
import { BASEURL } from "./BaseURL";

export const addItem = async (reqBody) => {
  return await axiosConfig("post",`${BASEURL}/items`, reqBody);
};

export const getItems = async () => {
  return await axiosConfig("get",`${BASEURL}/items`, "");
};

export const deleteItem = async (id) => {
  return await axiosConfig("delete",`${BASEURL}/items/${id}`, "");
};

export const updateItem = async (id, reqBody) => {
  return await axiosConfig("put",`${BASEURL}/items/${id}`, reqBody);
};

export const addOutfit = async (reqBody) => {
  return await axiosConfig("post", `${BASEURL}/outfits`, reqBody);
};

export const getOutfits = async () => {
  return await axiosConfig("get", `${BASEURL}/outfits`, "");
};

export const updateOutfit = async (id, reqBody) => {
  return await axiosConfig("patch", `${BASEURL}/outfits/${id}`, reqBody);
};

export const getProfile = async () => {
  return await axiosConfig("get", `${BASEURL}/profiles/1`, "");
};

export const updateProfile = async (reqBody) => {
  return await axiosConfig("patch", `${BASEURL}/profiles/1`, reqBody);
};
