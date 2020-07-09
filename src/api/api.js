import axios from "axios";
import { toast } from "react-toastify";

const requestHandler = (request) => {
  const token = localStorage.getItem("token");
  request.headers["Authorization"] = `Bearer ${token}`;
  return request;
};

const errorHandler = (error) => {
  if (error.response === undefined) {
    toast.error("Tidak dapat terhubung ke API");
    return;
  }
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
