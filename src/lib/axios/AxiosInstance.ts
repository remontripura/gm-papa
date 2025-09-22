import axios from "axios";
import Cookies from "js-cookie";

// Generic error types
export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IGenericErrorResponse = {
  statusCode?: number;
  message?: string;
  success?: string;
  errorMessages?: IGenericErrorMessage[];
};

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("GM_T");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response)
    const responseObject: any = {
      data: response?.data,
      status: response?.status,
      success: response?.data?.success,
    };
    return responseObject;
  },
  (error) => {
    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.status || 500,
      message: error?.response?.data || "Something went wrong",
      success: error?.response?.data?.success,
    };

    // Optional: redirect on unauthorized
    // if ([401, 403].includes(responseObject.statusCode)) {
    //   window.location.href = "/logout";
    // }

    return Promise.reject(responseObject);
  }
);

export default axiosInstance;
