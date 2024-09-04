import axios from "axios";
import Cookies from "universal-cookie";

const   instance = axios.create({
  baseURL: "http://localhost:5000/",
});

instance.interceptors.request.use(function (config) {
  const cookie = new Cookies()
  
  config.headers["Authorization"] = cookie.get("auth_token");
  config.headers["User-Id"] = cookie.get("id");

  return config;
});

export default instance;
