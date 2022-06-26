/* eslint-disable no-useless-constructor */
import GenericService from "./GenericService";

import axios from "axios";

class OrderService extends GenericService {
  constructor() {
    super();
  }

  GetOrders = () =>
    new Promise((resolve, reject) => {
      this.get("orders/getBuyerOrders")
        .then((data) => {
          console.log("Get Orders");
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  cancelOrder = (id) => axios.patch("orders/cancel/" + id);
  orderDetails = (id) => axios.get("orders/getBuyerOrderDetails/" + id);
}
let orderService = new OrderService();
export default orderService;
