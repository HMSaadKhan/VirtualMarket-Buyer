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

          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  register = (data) => this.post("buyers/signup", data);
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

  getUserName = () =>
    new Promise((resolve, reject) => {
      this.get("buyers/getName")
        .then((data) => {
          console.log("get Name");
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
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

  getUserDetails = () =>
    new Promise((resolve, reject) => {
      this.get("buyers/getDetails")
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  editUserDetails = (data) =>
    new Promise((resolve, reject) => {
      console.log(data);
      axios
        .patch("buyers/editDetails", data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  changePassword = (data) =>
    new Promise((resolve, reject) => {
      console.log(data);
      axios
        .patch("buyers/changePassword", data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
}
let buyerService = new BuyerService();
export default buyerService;
