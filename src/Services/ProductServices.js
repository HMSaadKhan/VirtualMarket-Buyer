/* eslint-disable no-useless-constructor */
import GenericService from "./GenericService";
import axios from "axios";

class ProductsService extends GenericService {
  constructor() {
    super();
  }
  getProducts = () => this.get("products/all");
  getProductDetails = (_id) =>
    new Promise((resolve, reject) => {
      this.get("products/details/" + _id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  getFiveByCategory = (_id) =>
    new Promise((resolve, reject) => {
      this.get("products/getFiveByCategory/" + _id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  getByCategory = (_id) =>
    new Promise((resolve, reject) => {
      this.get("products/getByCategory/" + _id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  getBySearch = (key) =>
    new Promise((resolve, reject) => {
      this.get("products/search/" + key)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  getbySeller = (id) => axios.get("products/getbyseller/" + id);
}

let productService = new ProductsService();
export default productService;
