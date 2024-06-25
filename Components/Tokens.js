import Cookies from "js-cookie";
import { IAuthResponse, ITokens } from "../../store/user/user.interface";

export const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken || null;
};

export const getRefreshToken = () => {
  const refreshToken = Cookies.get("refreshToken");
  return refreshToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const saveTokenStorage = (data) => {
  Cookies.set("accessToken", data.accessToken);
  Cookies.set("refreshToken", data.accessToken);
};

export const removeFromStorage = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.removeItem("user");
};

export const saveToStorage = (data) => {
  saveTokenStorage(data);
  localStorage.setItem("user", JSON.stringify(data.user));
};
