/* eslint-disable no-useless-constructor */
import GenericService from "./GenericService";
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

  getToken = () => {
    return localStorage.getItem("token");
  };

  register = (data) => this.post("buyers/signup", data);
  logout = () => {
    localStorage.removeItem("token");
  };
  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };

  getUserAvatar = () =>
    new Promise((resolve, reject) => {
      this.get("buyers/getavatar")
        .then((data) => {
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

  changePassword = (id, data) =>
    new Promise((resolve, reject) => {
      axios
        .patch("buyers/changePassword", data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  verificationOTP = () => this.post("buyers/verificationOTP");

  VerifyOtp = (data) =>
    new Promise((resolve, reject) => {
      console.log(data);
      axios
        .post("buyers/verify", data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  AddAvatar = (image) =>
    new Promise((resolve, reject) => {
      axios
        .post("buyers/editAvatar", image)
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
