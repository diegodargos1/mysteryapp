import axios from "axios";
const api = axios.create({
  baseURL: "https://themystery.herokuapp.com/",
  //baseURL: "http://192.168.1.66:5000",
});
export default api;
