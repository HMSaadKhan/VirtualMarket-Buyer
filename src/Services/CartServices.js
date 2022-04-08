import GenericService from "./GenericService";
import axios from "axios";
class CartService extends GenericService {
  constructor() {
    super();
  }
  addToCart = (data) =>
    new Promise((resolve, reject) => {
      console.log(data);
      axios
        .post("carts/add", data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  clearCart = () =>
    new Promise((resolve, reject) => {
      axios
        .delete("carts/clear")
        .then((data) => {
          console.log("delete cart");
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  getCart = () =>
    new Promise((resolve, reject) => {
      this.get("carts/get")
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  incQty = (_id) =>
    new Promise((resolve, reject) => {
      axios
        .patch("carts/incQty/" + _id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  deleteItem = (_id) =>
    new Promise((resolve, reject) => {
      axios
        .patch("carts/delete/" + _id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  decQty = (_id) =>
    new Promise((resolve, reject) => {
      axios
        .patch("carts/decQty/" + _id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  getQty = () =>
    new Promise((resolve, reject) => {
      axios
        .get("carts/count")
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  buyerDeliveryDetails = () =>
    new Promise((resolve, reject) => {
      axios
        .get("buyers/getDeliveryDetails")
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  SellerPaymentMethod = () =>
    new Promise((resolve, reject) => {
      axios
        .get("carts/getSellerPaymentMethods/")
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  CashOnDelivery = (data) =>
    new Promise((resolve, reject) => {
      console.log(data);
      axios
        .post("orders/codCheckout", data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
}

let cartService = new CartService();
export default cartService;
