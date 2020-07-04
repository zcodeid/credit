import axios from "axios";
import { toast } from "react-toastify";

const requestHandler = (request) => {
  const token = localStorage.getItem("token");
  request.headers["Authorization"] = `Bearer ${token}`;
  return request;
};

const errorHandler = (error) => {
  if (error.response.status === 403) window.location.href = "/login";
  toast.error(error.response.data.message);
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  return response;
};

export async function register(data) {
  return await axiosInstance.post("/auth/register/cf", data);
}

export async function login(data) {
  return await axiosInstance.post("/auth/login", data);
}

export async function realCash() {
  return await axiosInstance.get("/cf/real-cash");
}

export async function realCashPost(data) {
  return await axiosInstance.post("/cf/real-cash", data);
}

export async function realCashUpdate(data) {
  return await axiosInstance.put("/cf/real-cash", data);
}

export async function realCashDelete(id) {
  return await axiosInstance.delete("/cf/real-cash/" + id);
}

export async function realCashTotal() {
  return await axiosInstance.get("/cf/real-cash/total");
}

export async function walletGet() {
  return await axiosInstance.get("/cf/wallet");
}

export async function walletPost(data) {
  return await axiosInstance.post("/cf/wallet", data);
}

export async function walletUpdate(data) {
  return await axiosInstance.put("/cf/wallet", data);
}

export async function walletDelete(id) {
  return await axiosInstance.delete("/cf/wallet/" + id);
}

export async function walletAmount() {
  return await axiosInstance.get("/cf/wallet/amount");
}

export async function cashflowGet(page, size, walletId, tagNames) {
  page = page || 0;
  size = size || 4;
  walletId = walletId === "0" ? undefined : walletId;
  let url = `/cf/cashflow?page=${page}&size=${size}`;
  if (walletId) url += "&walletId=" + walletId;
  if (tagNames && tagNames.length > 0) url += "&tags=" + tagNames.join(",");
  return await axiosInstance.get(url);
}

export async function cashflowPost(data) {
  return await axiosInstance.post("/cf/cashflow", data);
}

export async function cashflowUpdate(data) {
  return await axiosInstance.put("/cf/cashflow", data);
}

export async function cashflowDelete(id) {
  return await axiosInstance.delete("/cf/cashflow/" + id);
}

export async function cashflowTotal(id) {
  return await axiosInstance.get("/cf/cashflow/total");
}

export async function cashflowBalance(walletId) {
  return await axiosInstance.get("/cf/cashflow/balance/" + walletId);
}

export async function changePassword(data) {
  return await axiosInstance.put("/user/change-my-password", data);
}

export async function updateProfile(data) {
  return await axiosInstance.put("/user/me", data);
}

export async function getTags() {
  return await axiosInstance.get("/cf/tag");
}
// Init Axios
const axiosInstance = axios.create({
  baseURL: "https://superapi.zcode.id",
  // baseURL: "http://localhost:5001",
});

// Add interceptors
axiosInstance.interceptors.request.use((request) => requestHandler(request));
axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);
