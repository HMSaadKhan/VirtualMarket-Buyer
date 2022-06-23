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
  clearAll = () =>
    new Promise((resolve, reject) => {
      axios
        .delete("carts/clearCart")
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
  incQty = (_id, data) =>
    new Promise((resolve, reject) => {
      axios
        .patch("carts/incQty/" + _id, data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  deleteItem = (_id, data) =>
    new Promise((resolve, reject) => {
      axios
        .patch("carts/delete/" + _id, data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  decQty = (_id, data) =>
    new Promise((resolve, reject) => {
      axios
        .patch("carts/decQty/" + _id, data)
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
  CashOnDelivery = (id, data) =>
    new Promise((resolve, reject) => {
      axios
        .post("orders/codCheckout/" + id, data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  OnlinePayment = (id, data) =>
    new Promise((resolve, reject) => {
      axios
        .post("orders/checkout/" + id, data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  ProceedToCheckOut = (_id) =>
    new Promise((resolve, reject) => {
      axios
        .get("carts/proceedToCheckout/" + _id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  // ProceedToCheckOut = (_id) =>
  //   new Promise((resolve, reject) => {
  //     axios
  //       .get("carts/getCheckoutCart/" + _id)
  //       .then((data) => {
  //         resolve(data);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });

  getCheckoutCart = (_id) =>
    new Promise((resolve, reject) => {
      this.get("carts/getCheckoutCart/" + _id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  setQuantity = (_id, data) =>
    new Promise((resolve, reject) => {
      axios
        .patch("carts/setqty/" + _id, data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  addOffer = (id) => axios.post("carts/addoffer/" + id);
}

let cartService = new CartService();
export default cartService;
