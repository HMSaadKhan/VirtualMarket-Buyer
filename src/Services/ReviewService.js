/* eslint-disable no-useless-constructor */
import GenericService from "./GenericService";

//import axios from "axios";

class ReviewService extends GenericService {
  constructor() {
    super();
  }

  ReviewPost = (_id, data) =>
    new Promise((resolve, reject) => {
      this.post("reviews/add/" + _id, data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  ReviewGet = (_id) =>
    new Promise((resolve, reject) => {
      this.get("reviews/getByProduct/" + _id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
}
let reviewService = new ReviewService();
export default reviewService;
