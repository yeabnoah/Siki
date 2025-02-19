import axios from "axios";
``
const axiosInstance = axios.create({
  baseURL: "https://new.nerdspacer.com",
  timeout: 10000,
});

export default axiosInstance;
