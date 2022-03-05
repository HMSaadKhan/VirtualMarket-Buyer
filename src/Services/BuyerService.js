import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
import axios from "axios";

class BuyerService extends GenericService {
  constructor() {
    super();
  }
  login = (email, password) =>
    new Promise((resolve, reject) => {
      this.post("buyers/login", { email, password })
        .then((token) => {
          console.log("login post");
          localStorage.setItem("token", token);
          // axios.defaults.headers.common["auth-token"] =
          //   localStorage.getItem("token");
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  register = (name, email, password) =>
    this.post("buyers/signup", { password, email, name });
  logout = () => {
    localStorage.removeItem("token");
  };
  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      const Jwt = jwtDecode(jwt);
      return Jwt._id;
    } catch (ex) {
      return null;
    }
  };

  getUserName = () => {
    this.get("getName/");
  };

  forgotPassword = (email) =>
    new Promise((resolve, reject) => {
      this.post("buyers/forgotPassword", { email })
        .then((token) => {
          console.log("forgotPassword Post");
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  resetPassword = (_id, data) =>
    new Promise((resolve, reject) => {
      this.patch("buyers/resetPassword/" + _id, data)
        .then((token) => {
          console.log("reset password");
          resolve(token);
        })
        .catch((error) => {
          reject(error);
        });
    });
}
let buyerService = new BuyerService();
export default buyerService;
